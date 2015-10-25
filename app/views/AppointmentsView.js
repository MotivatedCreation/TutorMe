var View = Parse.View.extend({

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var TutorDropdownSelectionView = View.extend({

  tagName: "li",
  template: _.template($('#tutor-dropdown-selection-template').html()),
});

var TimeDropdownSelectionView = View.extend({

  tagName: "li",
  template: _.template($('#time-dropdown-selection-template').html()),
});

var AppointmentEntryView = View.extend({

  tagName: "tr",
  template: _.template($('#appointment-entry-template').html()),
});

var AppointmentsView = Parse.View.extend({

  el: "#content-container",
  schedules: null,

  events: {
    'click #add-appointment-button' : 'showAddAppointmentModal',
    'click #cancel-add-appointment-modal-button' : 'hideAddAppointmentModal',
    'click #add-appointment-modal-button' : 'addAppointment',
    'click #remove-appointment-button' : 'removeAppointment',
    'tutor-dropdown-label:changed' : 'tutorDropDownLabelChanged',
    'time-dropdown-label:changed' : 'timeDropDownLabelChanged'
  },

  tutorDropDownLabelChanged: function(event) {
    $('#tutor-dropdown-label').text(event.target.text);

    if (this.schedules) {

      var times = [];

      for (var i = 0; i < this.schedules.length; i++)
      {
        var schedule = this.schedules[i];
        var scheduleEntries = schedule.get('scheduleEntries');

        if (scheduleEntries) {
          var selectedTutorName = $('#tutor-dropdown-label').html();
          var selectedDate = $('#datetimepicker').data("DateTimePicker").date();

          var tutor = schedule.get('tutor');
          var tutorName = tutor.get('firstName') + " " + tutor.get('lastName');

          scheduleEntries.forEach(function(scheduleEntry) {
            var timeEntries = scheduleEntry.get('timeEntries');

            if (scheduleEntry.get('day') == selectedDate.day()
                && timeEntries && timeEntries.length > 0
                && selectedTutorName && selectedTutorName == tutorName) {

                timeEntries.forEach(function(timeEntry) {
                  times[times.length] = timeEntry;
                });
            }
          });
        }
      }

      this.loadTimeDropdown(times);
    }
  },

  timeDropDownLabelChanged: function(event) {
    $('#time-dropdown-label').text(event.target.text);
  },

  initialize: function() {
    this.fetchSchedules();
    this.fetchAppointments();

    $('#add-appointment-button').hide();

    var currentUser = Parse.User.current();

    if (currentUser.get('accountType') == 0)
      $('#add-appointment-button').show();
  },

  fetchSchedules: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchSchedules');

    var self = this;

    var query = new Parse.Query('Schedule');
    query.include('tutor');
    query.include('scheduleEntries');
    query.include('scheduleEntries.timeEntries');

    query.find({
      success: function(theSchedules) {
        debugLog('[AppointmentsView] fetchSchedules success!');

        self.schedules = theSchedules;
        self.refreshAddAppointmentModal();
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  fetchAppointments: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchAppointments');

    var self = this;

    var query = new Parse.Query('Appointments');
    query.equalTo('users', Parse.User.current());

    query.find({
      success: function(appointments) {
        debugLog('[AppointmentsView] fetchAppointments success!');

        self.loadAppointments(appointments);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  refreshAddAppointmentModal: function() {
    debugLog('[AppointmentsView] refreshAddAppointmentModal');

    var self = this;

    $('#tutor-dropdown-label').text('Select a Tutor...');
    $('#time-dropdown-label').text('Select a Time...');

    $('#tutor-dropdown-menu').empty();
    $('#time-dropdown-menu').empty();

    if (this.schedules) {

      var tutors = [];

      for (var i = 0; i < this.schedules.length; i++)
      {
        var schedule = this.schedules[i];
        var scheduleEntries = schedule.get('scheduleEntries');

        if (scheduleEntries) {
          var selectedDate = $('#datetimepicker').data("DateTimePicker").date();

          scheduleEntries.forEach(function(scheduleEntry) {
            var timeEntries = scheduleEntry.get('timeEntries');

            if (scheduleEntry.get('day') == selectedDate.day()
                && timeEntries && timeEntries.length > 0) {
              var tutor = schedule.get('tutor');
              tutors[tutors.length] = tutor;
            }
          });
        }
      }

      this.loadTutorDropdown(tutors);
    }
  },

  loadTutorDropdown: function(tutors) {
    debugLog('[AppointmentsView] loadTutorDropdown');

    $('#tutor-dropdown-label').text('Select a Tutor...');
    $('#tutor-dropdown-menu').empty();

    if (tutors) {
      for (var i = 0; i < tutors.length; i++) {
        var tutor = tutors[i];

        var view = new TutorDropdownSelectionView({model: tutor});
        $("#tutor-dropdown-menu").append(view.render().el);

        if (i > tutors.length - 1)
          $("#tutor-dropdown-menu").append("<li role=\"separator\" class=\"divider\"></li>");
      }
    }
  },

  loadTimeDropdown: function(times) {
    debugLog('[AppointmentsView] loadTimeDropdown');

    $('#time-dropdown-label').text('Select a Time...');
    $('#time-dropdown-menu').empty();

    if (times) {
      for (var i = 0; i < times.length; i++) {
        var time = times[i];

        var view = new TimeDropdownSelectionView({model: time});
        $("#time-dropdown-menu").append(view.render().el);

        if (i > times.length - 1)
          $("#time-dropdown-menu").append("<li role=\"separator\" class=\"divider\"></li>");
      }
    }
  },

  loadAppointments: function(appointments) {
    debugLog('[AppointmentsView] loadAppointments');

    for (var i = 0; i < appointments.length; i++)
    {
      var view = new AppointmentsEntryView({model: appointments[i]});
      $("#appointment-table").append(view.render().el);
    }
  },

  showAddAppointmentModal: function() {
    debugLog('[AppointmentsView] showAddAppointmentModal');

    $('#add-appointment-modal').modal('show');
  },

  hideAddAppointmentModal: function() {
    debugLog('[AppointmentsView] hideAddAppointmentModal');

    $('#add-appointment-modal').modal('hide');
  },

  addAppointment: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] addAppointment');

    var self = this;

    var className = $('#appointment-name-input').val();

    var Appointment = Parse.Object.extend('Appointment');

    var query = new Parse.Query('Appointment');
    query.equalTo('name', className);

    query.first({
      success: function(theAppointment) {
        debugLog('[AppointmentsView] addAppointment success!');

        if (!theAppointment) {
          var Appointment = Parse.Object.extend('Appointment');
          theAppointment = new Appointment();
        }

        theAppointment.set('name', $('#appointment-name-input').val());
        theAppointment.add('users', Parse.User.current());

        theAppointment.save(null, {
          success: function(success) {
            debugLog('[AppointmentsView] addAppointment success!');

            self.hideAddAppointmentModal();
            location.reload();

            $(self.el).prepend($("#success-alert-template").html());

            $('#success-alert-label').text("Success! Your appointment has been successfully saved.");
          },
          error: function(error) {
            if (error)
              self.handleError(error);
          }
        });
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  removeAppointment: function(sender) {
    debugLog("[AppointmentsView] removeAppointment");

    $("#error-alert").remove();
    $("#success-alert").remove();

    var row = sender.currentTarget.parentNode.parentNode;
    var className = $(row).children('#appointment-name-label').text();

    var self = this;

    var Appointment = Parse.Object.extend('Appointment');

    var query = new Parse.Query('Appointment');
    query.equalTo('name', className);

    query.first({
      success: function(theAppointment) {
        debugLog('[AppointmentsView] removeAppointment success!');

        if (theAppointment) {
          theAppointment.set('name', className);
          theAppointment.remove('users', Parse.User.current());

          theAppointment.save(null, {
            success: function(success) {
              debugLog('[AppointmentsView] addAppointment success!');

              row.remove();

              $(self.el).prepend($("#success-alert-template").html());

              $('#success-alert-label').text("Success! " + className + " has been successfully removed.");
            },
            error: function(error) {
              if (error)
                self.handleError(error);
            }
          });
        }
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  handleError: function(error) {
    debugLog("[AppointmentsView] handleError");

    switch(error.code) {
      default: {
        $(this.el).prepend($('#error-alert-template').html());

        $('#error-alert-label').text('Uh Oh! An unknown error occurred.');
      }
      break;
    }
  }
});

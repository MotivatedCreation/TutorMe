var Appointment = Parse.Object.extend("Appointment", {
  tutorName: null,
  studentName: null,
  dateRange: null
});

var Appointments = Parse.Collection.extend({
  model: Appointment,
  query: new Parse.Query('Appointment'),

  initialize: function(attrs, options) {
    this.query.include('student');
    this.query.include('tutor');
    this.query.include('timeEntry');
  }
});

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
  appointments: new Appointments(),
  isReschedulingAppointment: false,
  appointmentToReschedule: null,

  events: {
    'click #add-appointment-button' : 'showAddAppointmentModal',
    'click #cancel-schedule-appointment-modal-button' : 'hideAddAppointmentModal',
    'click #schedule-appointment-modal-button' : 'addAppointment',
    'click #cancel-appointment-button' : 'cancelAppointment',
    'click #reschedule-appointment-button' : 'showRescheduleAppointmentModal',
    'click #reschedule-appointment-modal-button' : 'rescheduleAppointment',
    'tutor-dropdown:changed' : 'tutorDropDownChanged',
    'time-dropdown-menu:changed' : 'timeDropDownLabelChanged'
  },

  initialize: function() {
    var self = this;

    $('.activity-indicator-container').show();
    $('#appointment-table').hide();
    $('#appointment-table-header').hide();
    $('#reschedule-appointment-modal-button').hide();

    this.fetchSchedules().then(function(success) {
      return self.fetchAppointments();
    }).then(function(success) {
      $('.activity-indicator-container').fadeOut(1000);
      $('#appointment-table').fadeIn(1000);
      $('#appointment-table-header').fadeIn(1000);

    }, function(error) {
      if (error)
        handleError(error);
    });

    $('#add-appointment-button').hide();

    var currentUser = Parse.User.current();

    if (currentUser.get('accountType') == 0)
      $('#add-appointment-button').show();
  },

  showAddAppointmentModal: function() {
    debugLog('[AppointmentsView] showAddAppointmentModal');

    $('#add-appointment-modal').modal('show');

    this.loadAvailableTutors();
  },

  showRescheduleAppointmentModal: function(event) {
    debugLog('[AppointmentsView] showRescheduleAppointmentModal');

    this.isReschedulingAppointment = true;

    $('#reschedule-appointment-modal-button').show();
    $('#schedule-appointment-modal-button').hide();

    var appointmentId = $(event.currentTarget).val();
    this.appointmentToReschedule = this.appointmentForAppointmentId(appointmentId);

    $('#datetimepicker').data('DateTimePicker').date(this.appointmentToReschedule.get('date'));

    var tutor = this.appointmentToReschedule.get('tutor');
    $("#tutor-dropdown").find('.btn').html(this.appointmentToReschedule.get('tutorName') + ' <span class="caret"></span>');
    $("#tutor-dropdown").find('.btn').val(tutor['id']);

    var timeEntry = this.appointmentToReschedule.get('timeEntry');
    $("#time-dropdown").find('.btn').html(convertToTwelveHourTime(timeEntry.get('startTime')) + ' - ' + convertToTwelveHourTime(timeEntry.get('endTime')) + ' <span class="caret"></span>');
    $("#time-dropdown").find('.btn').val(timeEntry['id']);

    $('#tutor-dropdown').find('.btn').removeClass('disabled');
    $('#time-dropdown').find('.btn').removeClass('disabled');

    this.showAddAppointmentModal();
  },

  hideAddAppointmentModal: function() {
    debugLog('[AppointmentsView] hideAddAppointmentModal');

    $('#add-appointment-modal').modal('hide');
    $('#reschedule-appointment-modal-button').hide();
    $('#schedule-appointment-modal-button').show();

    $('#datetimepicker').data("DateTimePicker").date(new Date());

    this.isReschedulingAppointment = false;
    this.appointmentToReschedule = null;

    this.resetAddAppointmentModal();
  },

  resetAddAppointmentModal: function() {
    $('#schedule-appointment-modal-button').addClass('disabled');
    $('#reschedule-appointment-modal-button').addClass('disabled');

    $('.dropdown.open .dropdown-toggle').dropdown('toggle');

    $('#tutor-dropdown').find('.btn').html('Select a Tutor... <span class="caret"></span>');
    $('#time-dropdown').find('.btn').html('Select a Time... <span class="caret"></span>');

    $('#tutor-dropdown-menu').empty();
    $('#time-dropdown-menu').empty();

    $('#time-dropdown').find('.btn').addClass('disabled');
    $('#tutor-dropdown').find('.btn').addClass('disabled');
  },

  tutorDropDownChanged: function(event) {

    $(event.target).parents(".dropdown").find('.btn').html(event.target.text + ' <span class="caret"></span>');
    $(event.target).parents(".dropdown").find('.btn').val($(event.target).data('id'));

    if (this.isReschedulingAppointment)
      $('#reschedule-appointment-modal-button').addClass('disabled');
    else
      $('#schedule-appointment-modal-button').addClass('disabled');

    if (this.schedules) {

      var self = this;

      var times = [];

      for (var i = 0; i < this.schedules.length; i++)
      {
        var schedule = this.schedules[i];
        var scheduleEntries = schedule.get('scheduleEntries');

        if (scheduleEntries) {
          var currentDate = moment(new Date());
          var selectedTutorName = event.target.text;
          var selectedDate = $('#datetimepicker').data("DateTimePicker").date();

          var tutor = schedule.get('tutor');
          var tutorName = tutor.get('firstName') + " " + tutor.get('lastName');

          scheduleEntries.forEach(function(scheduleEntry) {
            var timeEntries = scheduleEntry.get('timeEntries');

            if (scheduleEntry.get('day') == selectedDate.day()
                && timeEntries && timeEntries.length > 0
                && selectedTutorName && selectedTutorName == tutorName) {

                timeEntries.forEach(function(timeEntry) {
                  if (timeEntry.get('startTime') > currentDate.hour())
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
    $(event.target).parents(".dropdown").find('.btn').html(event.target.text + ' <span class="caret"></span>');
    $(event.target).parents(".dropdown").find('.btn').val($(event.target).data('id'));

    if (this.isReschedulingAppointment)
      $('#reschedule-appointment-modal-button').removeClass('disabled');
    else
      $('#schedule-appointment-modal-button').removeClass('disabled');
  },

  tutorForTutorId: function(theTutorId) {
    for (var i = 0; i < this.schedules.length; i++)
    {
      var schedule = this.schedules[i];

      var tutor = schedule.get('tutor');
      var tutorId = tutor['id'];

      if (tutorId == theTutorId)
        return tutor;
    }
  },

  appointmentForAppointmentId: function(theAppointmentId) {
    for (var i = 0; i < this.appointments.length; i++)
    {
      var appointment = this.appointments.at(i);
      var appointmentId = appointment['id'];

      if (appointmentId == theAppointmentId)
        return appointment;
    }
  },

  timeEntryForTimeEntryId: function(timeEntryId) {
    var timeEntry;
    for (var i = 0; i < this.schedules.length; i++)
    {
      var schedule = this.schedules[i];
      var scheduleEntries = schedule.get('scheduleEntries');

      if (scheduleEntries) {
        scheduleEntries.forEach(function(scheduleEntry) {
          var timeEntries = scheduleEntry.get('timeEntries');

          if (timeEntries) {
            timeEntries.forEach(function(aTimeEntry) {
              if (aTimeEntry['id'] == timeEntryId) {
                timeEntry = aTimeEntry;
                return;
              }
            });
          }
        });
      }

      if (timeEntry)
        return timeEntry;
    }
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

    var promise = new Promise(function(resolve, reject) {
      query.find().then(function(theSchedules) {
        debugLog('[AppointmentsView] fetchSchedules success!');

        self.schedules = theSchedules;

        resolve();
      }, function(error) {
        reject(error);
      });
    });

    return promise;
  },

  fetchAppointments: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchAppointments');

    var self = this;

    var query = this.appointments.query;

    if (Parse.User.current().get('accountType') == 0)
      query.equalTo('student', Parse.User.current());
    else if (Parse.User.current().get('accountType') == 1)
      query.equalTo('tutor', Parse.User.current());

    var promise = new Promise(function(resolve, reject) {
      self.appointments.fetch().then(function(theAppointments) {
        debugLog('[AppointmentsView] fetchAppointments success!');

        self.loadAppointments();

        resolve();

      }, function(error) {
        reject(error);
      });
    });

    return promise;
  },

  loadAvailableTutors: function() {
    debugLog('[AppointmentsView] loadAvailableTutors');

    this.resetAddAppointmentModal();

    var self = this;

    if (this.schedules)
    {
      var tutors = [];

      this.schedules.forEach(function(schedule)
      {
        var scheduleEntries = schedule.get('scheduleEntries');

        if (scheduleEntries)
        {
          var currentDate = moment(new Date());
          var selectedDate = $('#datetimepicker').data("DateTimePicker").date();

          scheduleEntries.forEach(function(scheduleEntry)
          {
            var timeEntries = scheduleEntry.get('timeEntries');

            if (scheduleEntry.get('day') == selectedDate.day()
                && timeEntries && timeEntries.length > 0)
            {
              tutors[tutors.length] = schedule.get('tutor');
            }
          });
        }
      });

      this.loadTutorDropdown(tutors);
    }
  },

  loadTutorDropdown: function(tutors) {
    debugLog('[AppointmentsView] loadTutorDropdown');

    $('#tutor-dropdown').find('.btn').html('Select a Tutor... <span class="caret"></span>');

    $('#tutor-dropdown-menu').empty();

    if (tutors && tutors.length > 0) {
      $('#tutor-dropdown').find('.btn').removeClass('disabled');

      for (var i = 0; i < tutors.length; i++) {
        var tutor = tutors[i];

        var view = new TutorDropdownSelectionView({model: tutor});
        $("#tutor-dropdown-menu").append(view.render().el);

        if (i > tutors.length - 1)
          $("#tutor-dropdown-menu").append("<li role=\"separator\" class=\"divider\"></li>");
      }
    }
    else {
      $('#tutor-dropdown').find('.btn').addClass('disabled');
    }
  },

  loadTimeDropdown: function(times) {
    debugLog('[AppointmentsView] loadTimeDropdown');

    $('#time-dropdown').find('.btn').html('Select a Time... <span class="caret"></span>');

    $('#time-dropdown-menu').empty();

    if (times && times.length > 0) {
      $('#time-dropdown').find('.btn').removeClass('disabled');

      for (var i = 0; i < times.length; i++) {
        var time = times[i];

        var view = new TimeDropdownSelectionView({model: time});
        $("#time-dropdown-menu").append(view.render().el);

        if (i > times.length - 1)
          $("#time-dropdown-menu").append("<li role=\"separator\" class=\"divider\"></li>");
      }
    }
    else {
      $('#time-dropdown').find('.btn').addClass('disabled');
    }
  },

  loadAppointments: function() {
    debugLog('[AppointmentsView] loadAppointments');

    for (var i = 0; i < this.appointments.length; i++)
    {
      var appointment = this.appointments.at(i);
      var tutor = appointment.get('tutor');
      var student = appointment.get('student');
      var timeEntry = appointment.get('timeEntry');

      appointment.set('tutorName', tutor.get('firstName') + ' ' + tutor.get('lastName'));
      appointment.set('studentName', student.get('firstName') + ' ' + student.get('lastName'));
      appointment.set('dateRange', moment(appointment.get('date')).format('MMMM D, YYYY') + " @ " + convertToTwelveHourTime(timeEntry.get('startTime')) + " - " + convertToTwelveHourTime(timeEntry.get('endTime')));

      var view = new AppointmentEntryView({model: appointment});
      $("#appointment-table").append(view.render().el);
    }
  },

  addAppointment: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] addAppointment');

    var self = this;

    var date = $('#datetimepicker').data("DateTimePicker").date();
    var tutorId = $("#tutor-dropdown").find('.btn').val();
    var timeEntryId = $("#time-dropdown").find('.btn').val();

    var tutor = this.tutorForTutorId(tutorId);
    var timeEntry = this.timeEntryForTimeEntryId(timeEntryId);

    date.hour(timeEntry.get('startTime')).minute(0).second(0);

    var appointment;

    if (this.isReschedulingAppointment)
    {
      appointment = this.appointmentToReschedule;
    }
    else {
      var Appointment = Parse.Object.extend('Appointment');
      var appointment = new Appointment();
    }

    appointment.set('date', date.toDate());
    appointment.set('tutor', tutor);
    appointment.set('timeEntry', timeEntry);
    appointment.set('student', Parse.User.current());

    var promise = new Promise(function(resolve, reject) {
      appointment.save().then(function(success) {
        debugLog('[AppointmentsView] addAppointment success!');

        var tutor = appointment.get('tutor');
        var student = appointment.get('student');
        var timeEntry = appointment.get('timeEntry');

        appointment.set('tutorName', tutor.get('firstName') + ' ' + tutor.get('lastName'));
        appointment.set('studentName', student.get('firstName') + ' ' + student.get('lastName'));
        appointment.set('dateRange', moment(appointment.get('date')).format('MMMM D, YYYY') + " @ " + convertToTwelveHourTime(timeEntry.get('startTime')) + " - " + convertToTwelveHourTime(timeEntry.get('endTime')));

        $(self.el).prepend($("#success-alert-template").html());

        if (!self.isReschedulingAppointment) {
          $('#success-alert-label').text("Success! The appointment has been successfully scheduled.");

          self.appointments.add(appointment);

          var view = new AppointmentEntryView({model: appointment});
          $("#appointment-table").append(view.render().el);
        }
        else {
          $('#success-alert-label').text("Success! The appointment has been successfully rescheduled.");

          var tutorNameLabel = $('#appointment-table').find('#tutorName' + appointment['id']);
          tutorNameLabel.text(appointment.get('tutorName'));

          var dateRangeLabel = $('#appointment-table').find('#dateRange' + appointment['id']);
          dateRangeLabel.text(appointment.get('dateRange'));
        }

        self.hideAddAppointmentModal();

        resolve();

      }, function(error) {
        if (error)
          self.handleError(error);

        reject();
      });
    });

    return promise;
  },

  cancelAppointment: function(event) {
    debugLog("[AppointmentsView] removeAppointment");

    $("#error-alert").remove();
    $("#success-alert").remove();

    var row = event.currentTarget.parentNode.parentNode;

    var self = this;

    var appointmentToRemove;

    this.appointments.forEach(function(appointment) {
      if (appointment['id'] == $(event.currentTarget).val()) {
        appointmentToRemove = appointment;
        return;
      }
    });

    appointmentToRemove.destroy().then(function(success) {
      debugLog('[AppointmentsView] addAppointment success!');

      row.remove();
      self.appointments.remove(appointmentToRemove);

      $(self.el).prepend($("#success-alert-template").html());

      $('#success-alert-label').text("Success! The appointment has been successfully cancelled.");
    }, function(error) {
      if (error)
        self.handleError(error);
    });
  },

  rescheduleAppointment: function(event) {
    var self = this;

    this.addAppointment().then(function(success) {
      self.appointmentToReschedule = null;
      self.isReschedulingAppointment = false;
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

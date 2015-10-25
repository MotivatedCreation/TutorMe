var DropdownSelection = Parse.Object.extend({
  className: "User"
});

var DropdownSelectionView = Parse.View.extend({

  tagName: "li",
  template: _.template($('#dropdown-selection-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var AppointmentEntry = Parse.Object.extend({
  className: "Appointment"
});

var AppointmentEntryView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#appointment-entry-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var AppointmentsView = Parse.View.extend({

  el: "#content-container",

  events: {
    'click #add-appointment-button' : 'showAddAppointmentModal',
    'click #cancel-add-appointment-modal-button' : 'hideAddAppointmentModal',
    'click #add-appointment-modal-button' : 'addAppointment',
    'click #remove-appointment-button' : 'removeAppointment'
  },

  initialize: function() {
    this.fetchTutors();
    this.fetchAppointments();

    $('#add-appointment-button').hide();

    var currentUser = Parse.User.current();

    if (currentUser.get('accountType') == 0)
      $('#add-appointment-button').show();
  },

  fetchTutors: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchTutors');

    var self = this;

    var query = new Parse.Query(Parse.User);
    query.equalTo('accountType', 1);

    query.find({
      success: function(tutors) {
        debugLog('[AppointmentsView] fetchTutors success!');

        self.loadTutorDropdrown(tutors);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  loadTutorDropdrown: function(tutors) {
    debugLog('[AppointmentsView] loadTutorDropdrown');

    for (var i = 0; i < tutors.length; i++)
    {
      var view = new DropdownSelectionView({model: tutors[i]});
      $("#tutor-dropdown-menu").append(view.render().el);

      if (i > tutors.length - 1)
        $("#tutor-dropdown-menu").append("<li role=\"separator\" class=\"divider\"></li>");
    }
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

$(function() {
  new AppointmentsView();
});

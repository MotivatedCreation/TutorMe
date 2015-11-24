var Schedule = Parse.Object.extend("Schedue");
var Schedules = Parse.Collection.extend({
  model: Schedule,
  query: new Parse.Query('Schedule'),

  initialize: function(attrs, options) {
    this.query.include('tutor');
    this.query.include('scheduleEntries');
    this.query.include('scheduleEntries.timeEntries');
  }
});

var Appointment = Parse.Object.extend("Appointment");
var Appointments = Parse.Collection.extend({
  model: Appointment,
  query: new Parse.Query('Appointment'),

  initialize: function(attrs, options) {
    this.query.include('student');
    this.query.include('tutor');
    this.query.include('timeEntry');
    this.query.include('class');
    this.query.include('teacher');
  }
});

var Class = Parse.Object.extend("Class");
var Classes = Parse.Collection.extend({
  model: Class,
  query: new Parse.Query('Class')
});

var Teacher = Parse.Object.extend("User");
var Teachers = Parse.Collection.extend({
  model: Teacher,
  query: new Parse.Query('User'),

  initialize: function() {
    this.query.equalTo('accountType', 2);
  },
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

var ClassDropdownSelectionView = View.extend({
  tagName: "li",
  template: _.template($('#class-dropdown-selection-template').html()),
});

var TeacherDropdownSelectionView = View.extend({
  tagName: "li",
  template: _.template($('#teacher-dropdown-selection-template').html()),
});

var AppointmentEntryView = View.extend({
  tagName: "tr",
  template: _.template($('#appointment-entry-template').html()),

  render: function() {
    var json = this.model.toJSON();
    json['tutorName'] = this.model.get('tutor').get('firstName') + ' ' + this.model.get('tutor').get('lastName');
    json['studentName'] = this.model.get('student').get('firstName') + ' ' + this.model.get('student').get('lastName');
    json['dateRange'] = moment(this.model.get('date')).format('MMMM D, YYYY') + " @ " + convertToTwelveHourTime(this.model.get('timeEntry').get('startTime')) + " - " + convertToTwelveHourTime(this.model.get('timeEntry').get('endTime'));

    $(this.el).html(this.template(json));
    return this;
  }
});

var AppointmentsView = Parse.View.extend({

  el: "#content-container",

  schedules: new Schedules(),
  classes: new Classes(),
  teachers: new Teachers(),
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
    'time-dropdown:changed' : 'timeDropDownLabelChanged',
    'class-dropdown:changed' : 'classDropDownLabelChanged',
    'teacher-dropdown:changed' : 'teacherDropDownLabelChanged'
  },

  initialize: function() {
    var self = this;

    $('.activity-indicator-container').show();
    $('#appointment-table').hide();
    $('#appointment-table-header').hide();
    $('#reschedule-appointment-modal-button').hide();

    // This needs to be optimized. There's no need to make 4 successive calls to the server.
    // The database should be restructured so that you only need to make 1 call.
    this.fetchSchedules().then(function(success) {
      return self.fetchClasses();
    }).then(function(success) {
      return self.fetchTeachers();
    }).then(function(success) {
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
    this.loadClassesDropdown();
    this.loadTeachersDropdown();
  },

  showRescheduleAppointmentModal: function(event) {
    debugLog('[AppointmentsView] showRescheduleAppointmentModal');

    this.isReschedulingAppointment = true;

    $('#reschedule-appointment-modal-button').show();
    $('#schedule-appointment-modal-button').hide();

    var appointmentId = $(event.currentTarget).val();
    this.appointmentToReschedule = this.appointmentForAppointmentId(appointmentId);
    this.showAddAppointmentModal();

    $('#datetimepicker').data('DateTimePicker').date(this.appointmentToReschedule.get('date'));

    var tutor = this.appointmentToReschedule.get('tutor');
    var tutorName = tutor.get('firstName') + ' ' + tutor.get('lastName');

    $("#tutor-dropdown").find('.btn').html(tutorName + ' <span class="caret"></span>');
    $("#tutor-dropdown").find('.btn').val(tutor['id']);

    var timeEntry = this.appointmentToReschedule.get('timeEntry');
    $("#time-dropdown").find('.btn').html(convertToTwelveHourTime(timeEntry.get('startTime')) + ' - ' + convertToTwelveHourTime(timeEntry.get('endTime')) + ' <span class="caret"></span>');
    $("#time-dropdown").find('.btn').val(timeEntry['id']);

    var aClass = this.appointmentToReschedule.get('class');
    $("#class-dropdown").find('.btn').html(aClass.get('name') + ' <span class="caret"></span>');
    $("#class-dropdown").find('.btn').val(aClass['id']);

    var teacher = this.appointmentToReschedule.get('teacher');
    var teacherName = teacher.get('firstName') + ' ' + teacher.get('lastName');

    $("#teacher-dropdown").find('.btn').html(teacherName + ' <span class="caret"></span>');
    $("#teacher-dropdown").find('.btn').val(teacher['id']);

    $('#tutor-dropdown').find('.btn').removeClass('disabled');
    $('#time-dropdown').find('.btn').removeClass('disabled');
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
    $('#time-dropdown').find('.btn').val(null);

    $('#time-dropdown').find('.btn').html('Select a Time... <span class="caret"></span>');
    $('#time-dropdown').find('.btn').val(null);

    $('#tutor-dropdown-menu').empty();
    $('#time-dropdown-menu').empty();

    $('#time-dropdown').find('.btn').addClass('disabled');
    $('#tutor-dropdown').find('.btn').addClass('disabled');
  },

  updateDropdownBasedOnEvent: function(anEvent) {
    debugLog('[AppointmentsView] updateDropdownBasedOnEvent');

    /*
      The event is being triggered for every item in the selected dropdown's
      list. This needs to be fixed so that the event is only triggered once.
    */

    $(anEvent.target).parents(".dropdown").find('.btn').html(anEvent.target.text + ' <span class="caret"></span>');
    $(anEvent.target).parents(".dropdown").find('.btn').val($(anEvent.target).data('id'));

    var tutorDropdownValue = $('#tutor-dropdown').find('.btn').val();
    var timeDropdownValue = $('#time-dropdown').find('.btn').val();
    var classDropdownValue = $('#class-dropdown').find('.btn').val();
    var teacherDropdownValue = $('#teacher-dropdown').find('.btn').val();

    if (tutorDropdownValue && timeDropdownValue
        && classDropdownValue && teacherDropdownValue)
    {
      if (this.isReschedulingAppointment)
        $('#reschedule-appointment-modal-button').removeClass('disabled');
      else
        $('#schedule-appointment-modal-button').removeClass('disabled');
    }
  },

  tutorDropDownChanged: function(event) {
    debugLog('[AppointmentsView] tutorDropDownChanged');

    this.updateDropdownBasedOnEvent(event);
    this.loadTimesForTutorWithId($(event.target).data('id'));
  },

  timeDropDownLabelChanged: function(event) {
    debugLog('[AppointmentsView] timeDropDownLabelChanged');

    this.updateDropdownBasedOnEvent(event);
  },

  classDropDownLabelChanged: function(event) {
    debugLog('[AppointmentsView] classDropDownLabelChanged');

    this.updateDropdownBasedOnEvent(event);
  },

  teacherDropDownLabelChanged: function(event) {
    debugLog('[AppointmentsView] teacherDropDownLabelChanged');

    this.updateDropdownBasedOnEvent(event);
  },

  tutorForTutorId: function(theTutorId) {
    debugLog('[AppointmentsView] tutorForTutorId');

    for (var i = 0; i < this.schedules.length; i++)
    {
      var schedule = this.schedules.at(i);

      var tutor = schedule.get('tutor');
      var tutorId = tutor['id'];

      if (tutorId == theTutorId)
        return tutor;
    }
  },

  appointmentForAppointmentId: function(theAppointmentId) {
    debugLog('[AppointmentsView] appointmentForAppointmentId');

    for (var i = 0; i < this.appointments.length; i++)
    {
      var appointment = this.appointments.at(i);
      var appointmentId = appointment['id'];

      if (appointmentId == theAppointmentId)
        return appointment;
    }
  },

  timeEntryForTimeEntryId: function(timeEntryId) {
    debugLog('[AppointmentsView] timeEntryForTimeEntryId');

    var timeEntry;
    for (var i = 0; i < this.schedules.length; i++)
    {
      var schedule = this.schedules.at(i);
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

  classForClassId: function(theClassId) {
    debugLog('[AppointmentsView] classForClassId');

    for (var i = 0; i < this.classes.length; i++)
    {
      var aClass = this.classes.at(i);
      var classId = aClass['id'];

      if (classId == theClassId)
        return aClass;
    }
  },

  teacherForTeacherId: function(theTeacherId) {
    debugLog('[AppointmentsView] teacherForTeacherId');

    for (var i = 0; i < this.teachers.length; i++)
    {
      var teacher = this.teachers.at(i);
      var teacherId = teacher['id'];

      if (teacherId == theTeacherId)
        return teacher;
    }
  },

  fetchSchedules: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchSchedules');

    var self = this;
    var query = this.schedules.query;

    var promise = new Promise(function(resolve, reject) {
      self.schedules.fetch().then(function(theSchedules) {
        debugLog('[AppointmentsView] fetchSchedules success!');

        resolve();
      }, function(error) {
        reject(error);
      });
    });

    return promise;
  },

  fetchClasses: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchClasses');

    var self = this;
    var query = this.classes.query;

    var promise = new Promise(function(resolve, reject) {
      self.classes.fetch().then(function(theClasses) {
        debugLog('[AppointmentsView] fetchClasses success!');

        resolve();
      }, function(error) {
        reject(error);
      });
    });

    return promise;
  },

  fetchTeachers: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AppointmentsView] fetchTeachers');

    var self = this;
    var query = this.teachers.query;

    var promise = new Promise(function(resolve, reject) {
      self.teachers.fetch().then(function(theTeachers) {
        debugLog('[AppointmentsView] fetchTeachers success!');

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
    var tutors = [];

    this.schedules.forEach(function(schedule)
    {
      var scheduleEntries = schedule.get('scheduleEntries');

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
    });

    this.loadTutorDropdown(tutors);
  },

  loadTimesForTutorWithId: function(selectedTutorId)
  {
    var self = this;
    var times = [];

    var schedule;

    this.schedules.forEach(function(aSchedule) {
      if (aSchedule.get('tutor')['id'] == selectedTutorId) {
        schedule = aSchedule;
        return;
      }
    });

    schedule.get('scheduleEntries').forEach(function(scheduleEntry) {
      var currentDate = moment(new Date());
      var selectedDate = $('#datetimepicker').data("DateTimePicker").date();

      var tutor = schedule.get('tutor');
      var tutorId = tutor['id'];

      var timeEntries = scheduleEntry.get('timeEntries');

      if (scheduleEntry.get('day') == selectedDate.day()
          && timeEntries && timeEntries.length > 0
          && selectedTutorId == tutorId) {

          timeEntries.forEach(function(timeEntry) {
            times[times.length] = timeEntry;
          });
      }
    });

    this.loadTimeDropdown(times);
  },

  loadTutorDropdown: function(tutors) {
    debugLog('[AppointmentsView] loadTutorDropdown');

    $('#tutor-dropdown').find('.btn').html('Select a Tutor... <span class="caret"></span>');
    $('#tutor-dropdown').find('.btn').val(null);

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
    $('#time-dropdown').find('.btn').val(null);

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

  loadClassesDropdown: function() {
    debugLog('[AppointmentsView] loadClassesDropdown');

    $('#class-dropdown').find('.btn').html('Select a Class... <span class="caret"></span>');

    $('#class-dropdown-menu').empty();

    this.classes.forEach(function(aClass) {
      var view = new ClassDropdownSelectionView({model: aClass});
      $("#class-dropdown-menu").append(view.render().el);
    });
  },

  loadTeachersDropdown: function() {
    debugLog('[AppointmentsView] loadTeachersDropdown');

    $('#teacher-dropdown').find('.btn').html('Select a Teacher... <span class="caret"></span>');

    $('#teacher-dropdown-menu').empty();

    this.teachers.forEach(function(aTeacher) {
      var view = new TeacherDropdownSelectionView({model: aTeacher});
      $("#teacher-dropdown-menu").append(view.render().el);
    });
  },

  loadAppointments: function() {
    debugLog('[AppointmentsView] loadAppointments');

    for (var i = 0; i < this.appointments.length; i++)
    {
      var appointment = this.appointments.at(i);
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
    var classId = $("#class-dropdown").find('.btn').val();
    var teacherId = $("#teacher-dropdown").find('.btn').val();

    var tutor = this.tutorForTutorId(tutorId);
    var aClass = this.classForClassId(classId);
    var teacher = this.teacherForTeacherId(teacherId);
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
    appointment.set('class', aClass);
    appointment.set('teacher', teacher);
    appointment.set('student', Parse.User.current());

    var promise = new Promise(function(resolve, reject) {
      appointment.save().then(function(success) {
        debugLog('[AppointmentsView] addAppointment success!');
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
    debugLog("[AppointmentsView] rescheduleAppointment");

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

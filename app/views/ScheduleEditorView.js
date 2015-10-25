var ScheduleEditorView = Parse.View.extend({

  el: "#content-container",
  schedule: null,

  events: {
    'click #save-schedule-button' : 'saveSchedule'
  },

  convertToTwelveHourTime: function(hour) {
    var time = "";

    if (hour < 12)
      time = hour + ":00 AM";
    else if (hour > 12)
      time = (hour - 12) + ":00 PM";
    else if (hour == 12)
      time = hour + ":00 PM";

    return time;
  },

  initialize: function() {
    this.fetchSchedule();

    for (var i = 1; i <= 11; i++)
      $('#schedule-table').append("<tr id=\"hour" + i + "\">" + $('#schedule-entry-template').html() + "</tr>");

    var timeLabels = document.querySelectorAll('.time-label');

    var hour = 8;

    for (var i = 1; i <= timeLabels.length; i++) {
      var fromHour = this.convertToTwelveHourTime(hour);
      var toHour = this.convertToTwelveHourTime(++hour);
      var timeSpan = fromHour + " - " + toHour;
      timeLabels[i - 1]['textContent'] = timeSpan;
    }
  },

  fetchSchedule: function() {
    $("#invalid-input-alert").remove();
    $("#success-alert").remove();

    debugLog('[ScheduleEditorView] fetchSchedule');

    $('.activity-indicator-container').show();
    $('#schedule-table').hide();
    $('#save-schedule-button').hide();

    var self = this;

    var promise = new Promise(function(resolve, reject) {
      var query = new Parse.Query('Schedule');
      query.equalTo('tutor', Parse.User.current());
      query.include('scheduleEntries');

      query.first().then(function(theSchedule) {

        debugLog('[ScheduleEditorView] fetchSchedule success!');

        $('.activity-indicator-container').fadeOut(1000);
        $('#schedule-table').fadeIn(1000);
        $('#save-schedule-button').fadeIn(1000);

        schedule = theSchedule;

        if (!schedule) {
          var Schedule = Parse.Object.extend('Schedule');
          schedule = new Schedule();
        }

        self.loadSchedule();

      }, function(error) {
        if (error)
          self.handleError(error);
      });

      return promise;
    });
  },

  loadSchedule: function() {
    debugLog('[ScheduleEditorView] loadSchedule');

    var scheduleEntries = schedule.get('scheduleEntries');

    if (scheduleEntries) {
      var tableChildIndexOffset = 2;

      scheduleEntries.forEach(function(entry, day) {
        $('#schedule-table td:nth-child(' + (day + tableChildIndexOffset) + ')').map(function(hour) {
          var checkbox = $(this).children()[0];

          entry.get('hours').some(function(entryHour) {
            if (entryHour == hour)
              checkbox.checked = true;

            return;
          });
        });
      });
    }
  },

  saveSchedule: function() {
    $("#invalid-input-alert").remove();
    $("#success-alert").remove();

    debugLog('[ScheduleEditorView] saveSchedule');

    schedule.set('tutor', Parse.User.current());

    var ScheduleEntry = Parse.Object.extend('ScheduleEntry');
    var scheduleEntries = schedule.get('scheduleEntries');

    if (!scheduleEntries)
    {
      scheduleEntries = [];

      for (var day = 0; day < 7; day++)
      {
        var scheduleEntry = new ScheduleEntry();
        scheduleEntry.set('day', day);
        scheduleEntry.set('schedule', schedule);
        scheduleEntries[day] = scheduleEntry;
      }
    }

    var tableChildIndexOffset = 2;

    for (var day = tableChildIndexOffset; day <= 8; day++)
    {
      var scheduleEntry = scheduleEntries[(day - tableChildIndexOffset)];
      scheduleEntry.set('hours', []);

      $('#schedule-table td:nth-child(' + day + ')').map(function(hour) {

        var checkbox = $(this).children()[0];

        if (checkbox.checked) {
          scheduleEntry.add('hours', hour);
          scheduleEntries[(day - tableChildIndexOffset)] = scheduleEntry;
        }
      });
    }

    var self = this;

    schedule.set('scheduleEntries', scheduleEntries);
    schedule.save().then(function(success)
    {
      debugLog('[ScheduleEditorView] saveSchedule success!');

      $(self.el).prepend($("#success-alert-template").html());

      $('#success-alert-label').text("Success! Your schedule has been successfully saved.");
    }, function(error) {
      if (error)
        self.handleError(error);
    });
  },

  handleError: function(error) {
    debugLog("[ScheduleEditorView] handleError: ");
    debugLog(error);

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
  new ScheduleEditorView();
});

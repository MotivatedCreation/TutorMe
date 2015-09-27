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

    var self = this;

    var promise = new Promise(function(resolve, reject) {
      var query = new Parse.Query('Schedule');
      query.equalTo('tutor', Parse.User.current());

      query.first({
        success: function(theSchedule) {
          debugLog('[ScheduleEditorView] fetchSchedule success!');

          schedule = theSchedule;

          if (!schedule) {
            var Schedule = Parse.Object.extend('Schedule');
            schedule = new Schedule();
          }
          else {
            self.loadSchedule();
          }
        },

        error: function(error) {
          if (error)
            self.handleError(error);
        }
      });

      return promise;
    });
  },

  loadSchedule: function() {
    debugLog('[ScheduleEditorView] loadSchedule');

    var table = $('#schedule-table')[0];
    var days = table.rows[0].querySelectorAll('.day');

    for (var i = 1; i < table.rows.length; i++)
    {
      var hour = table.rows[i];
      var timeCheckboxes = hour.querySelectorAll('.time-checkbox');

      for (var j = 0; j < timeCheckboxes.length; j++)
      {
        var day = days[j]['textContent'];
        var checkbox = timeCheckboxes[j];

        if (schedule['attributes'][day.toLowerCase()][i])
          checkbox.checked = true;
      }
    }
  },

  saveSchedule: function() {
    $("#invalid-input-alert").remove();
    $("#success-alert").remove();

    debugLog('[ScheduleEditorView] saveSchedule');

    var table = $('#schedule-table')[0];
    var days = table.rows[0].querySelectorAll('.day');

    var newSchedule = {
      tutor: Parse.User.current(),
      sunday: new Array(table.rows.length),
      monday: new Array(table.rows.length),
      tuesday: new Array(table.rows.length),
      wednesday: new Array(table.rows.length),
      thursday: new Array(table.rows.length),
      friday: new Array(table.rows.length),
      saturday: new Array(table.rows.length)
    };

    for (var i = 1; i < table.rows.length; i++)
    {
      var hour = table.rows[i];
      var timeCheckboxes = hour.querySelectorAll('.time-checkbox');

      for (var j = 0; j < timeCheckboxes.length; j++)
      {
        var day = days[j]['textContent'];
        var checkbox = timeCheckboxes[j];

        if (checkbox.checked)
          newSchedule[day.toLowerCase()][i] = i;
      }
    }

    var self = this;

    schedule.set('sunday', newSchedule['sunday']);
    schedule.set('monday', newSchedule['monday']);
    schedule.set('tuesday', newSchedule['tuesday']);
    schedule.set('wednesday', newSchedule['wednesday']);
    schedule.set('thursday', newSchedule['thursday']);
    schedule.set('friday', newSchedule['friday']);
    schedule.set('saturday', newSchedule['saturday']);

    schedule.save(null, {
      success: function(success) {
        debugLog('[ScheduleEditorView] saveSchedule success!');

        $(self.el).prepend($("#success-alert-template").html());

        $('#success-alert-label').text("Success! Your schedule has been successfully saved.");
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  handleError: function(error) {
    debugLog("[ScheduleEditorView] handleError");

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

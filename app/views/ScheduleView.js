var ScheduleView = Parse.View.extend({

  el: "#content-container",
  schedules: null,

  events: {
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
    this.fetchSchedules();

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

  fetchSchedules: function() {
    $("#error-alert").remove();

    debugLog('[ScheduleView] fetchSchedules');

    $('.activity-indicator-container').show();
    $('#schedule-table').hide();

    var self = this;

    var promise = new Promise(function(resolve, reject) {
      var query = new Parse.Query('Schedule');
      query.include('tutor');
      query.include('scheduleEntries');

      query.find({
        success: function(theSchedules) {
          debugLog('[ScheduleView] fetchSchedules success!');

          $('.activity-indicator-container').fadeOut(1000);
          $('#schedule-table').fadeIn(1000);

          schedules = theSchedules;

          if (schedules.length > 0) {
            self.loadSchedule();
          }
        },

        error: function(error) {
          if (error)
            self.handleError();
        }
      });

      return promise;
    });
  },

  loadSchedule: function() {
    debugLog('[ScheduleView] loadSchedule');

    for (var i = 0; i < schedules.length; i++)
    {
      var schedule = schedules[i];
      var scheduleEntries = schedule.get('scheduleEntries');

      if (scheduleEntries) {
        var tutor = schedule.get('tutor');
        var tableChildIndexOffset = 2;

        scheduleEntries.forEach(function(entry, day) {
          $('#schedule-table td:nth-child(' + (day + tableChildIndexOffset) + ')').map(function(hour) {

            var day = this;

            entry.get('hours').some(function(entryHour) {
              if (entryHour == hour) {
                if (day['textContent'])
                  day['textContent'] += ", " + tutor.get('lastName');
                else
                  day['textContent'] = tutor.get('lastName');

                return;
              }
            });
          });
        });
      }
    }
  },

  handleError: function(error) {
    debugLog("[ScheduleView] handleError");

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
  new ScheduleView();
});

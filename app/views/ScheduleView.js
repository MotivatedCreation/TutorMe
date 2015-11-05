var ScheduleView = Parse.View.extend({

  el: "#content-container",
  schedules: null,

  events: {
  },

  initialize: function() {
    this.fetchSchedules();

    for (var i = 1; i <= 11; i++)
      $('#schedule-table').append("<tr id=\"hour" + i + "\">" + $('#schedule-entry-template').html() + "</tr>");

    var timeLabels = document.querySelectorAll('.time-label');

    var hour = 8;

    for (var i = 1; i <= timeLabels.length; i++) {
      var fromHour = convertToTwelveHourTime(hour);
      var toHour = convertToTwelveHourTime(++hour);
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
      query.include('scheduleEntries.timeEntries');

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

    schedules.forEach(function(schedule) {
      var scheduleEntries = schedule.get('scheduleEntries');

      if (scheduleEntries) {
        var tutor = schedule.get('tutor');
        var tableChildIndexOffset = 2;

        scheduleEntries.forEach(function(scheduleEntry) {

          var day = scheduleEntry.get('day');
          var timeEntries = scheduleEntry.get('timeEntries');

          if (timeEntries) {
            $('#schedule-table td:nth-child(' + (day + tableChildIndexOffset) + ')').map(function(hour) {
              var day = this;

              timeEntries.some(function(timeEntry) {
                var startTime = (timeEntry.get('startTime') - kOpenAt);
                var endTime = (timeEntry.get('endTime') - kOpenAt);

                if (hour == startTime && hour == (endTime - 1)) {

                  if (day['textContent'])
                    day['textContent'] += ", " + tutor.get('lastName');
                  else
                    day['textContent'] = tutor.get('lastName');

                  return true;
                }
              });
            });
          }
        });
      }
    });
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

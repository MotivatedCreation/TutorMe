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

    var self = this;

    var promise = new Promise(function(resolve, reject) {
      var query = new Parse.Query('Schedule');
      query.include('tutor');

      query.find({
        success: function(theSchedules) {
          debugLog('[ScheduleView] fetchSchedules success!');

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

    var table = $('#schedule-table')[0];
    var dayColumnNames = table.rows[0].querySelectorAll('.day');

    for (var i = 0; i < schedules.length; i++)
    {
      var schedule = schedules[i];
      var scheduleInfo = schedule['attributes'];

      var hours = table.rows;

      for (var j = 1; j < hours.length; j++)
      {
        var hour = hours[j];
        var dayRow = hour.querySelectorAll('td');

        for (var k = 0; k < dayColumnNames.length; k++)
        {
          var dayColumnName = dayColumnNames[k]['textContent'];
          var dayData = dayRow[k + 1];

          if (scheduleInfo[dayColumnName.toLowerCase()][j])
          {
            var tutor = scheduleInfo['tutor']['attributes'];

            if (dayData['textContent'])
              dayData['textContent'] += ", " + tutor['lastName'];
            else
              dayData['textContent'] = tutor['lastName'];
          }
        }
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

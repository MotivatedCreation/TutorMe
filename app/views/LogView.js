var LogEntry = Parse.Object.extend({
  className: "Appointment"
});

var LogEntryView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#log-entry-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    var json = this.model.toJSON();
    json['className'] = this.model.get('class').get('name');
    json['tutorName'] = this.model.get('tutor').get('firstName') + ' ' + this.model.get('tutor').get('lastName');
    json['studentName'] = this.model.get('student').get('firstName') + ' ' + this.model.get('student').get('lastName');
    json['teacherName'] = this.model.get('teacher').get('firstName') + ' ' + this.model.get('teacher').get('lastName');
    json['dateRange'] = moment(this.model.get('date')).format('MMMM D, YYYY') + " @ " + convertToTwelveHourTime(this.model.get('timeEntry').get('startTime')) + " - " + convertToTwelveHourTime(this.model.get('timeEntry').get('endTime'));

    $(this.el).html(this.template(json));

    return this;
  }
});

var Log = Parse.Collection.extend({
  model: LogEntry
});

var LogView = Parse.View.extend({

  el: "#content-container",

  events: {
    'click #search-button' : 'search'
  },

  initialize: function() {
    _.bindAll(this, 'addAll');

    this.tutorLog = new Log();
    this.tutorLog.query = new Parse.Query("Appointment");
    this.tutorLog.query.include('student');
    this.tutorLog.query.include('tutor');
    this.tutorLog.query.include('class');
    this.tutorLog.query.include('teacher');
    this.tutorLog.query.include('timeEntry');

    this.tutorLog.bind('reset', this.addAll);

    this.tutorLog.fetch();
  },

  addOne: function(logEntry) {
    var view = new LogEntryView({model: logEntry});
    this.$("#log-table").append(view.render().el);
  },

  addAll: function() {
    this.tutorLog.each(this.addOne);
  },

  search: function() {

    var searchTerm = $('#searchbar').val();

    debugLog('[LogView] search ' + searchTerm);

    $("#log-table tbody td").remove();

    var self = this;

    this.tutorLog.forEach(function(logEntry)
    {
      var date = moment(logEntry.get('date')).format('MMMM D, YYYY') + " @ " + convertToTwelveHourTime(logEntry.get('timeEntry').get('startTime')) + " - " + convertToTwelveHourTime(logEntry.get('timeEntry').get('endTime'));

      if (date.indexOf(searchTerm) > -1
          || logEntry.get('tutor').get('firstName').indexOf(searchTerm) > -1
          || logEntry.get('tutor').get('lastName').indexOf(searchTerm) > -1
          || logEntry.get('student').get('firstName').indexOf(searchTerm) > -1
          || logEntry.get('student').get('lastName').indexOf(searchTerm) > -1
          || logEntry.get('class').get('name').indexOf(searchTerm) > -1
          || logEntry.get('teacher').get('firstName').indexOf(searchTerm) > -1
          || logEntry.get('teacher').get('lastName').indexOf(searchTerm) > -1)
      {
          self.addOne(logEntry);
      }
    });
  }
});

$(function() {

  new LogView;

});

var LogEntry = Parse.Object.extend({
  className: "LogEntry"
});

var LogEntryView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#log-entry-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var Log = Parse.Collection.extend({
  model: LogEntry
});

var LogView = Parse.View.extend({

  el: "#log-table",

  initialize: function() {
    _.bindAll(this, 'addAll');

    this.tutorLog = new Log();
    this.tutorLog.query = new Parse.Query("LogEntry");

    this.tutorLog.bind('reset', this.addAll);

    this.tutorLog.fetch();
  },

  addOne: function(logEntry) {
    var view = new LogEntryView({model: logEntry});
    this.$("#log-table").append(view.render().el);
  },

  addAll: function() {
    this.tutorLog.each(this.addOne);
  }
});

$(function() {

  new LogView;

});

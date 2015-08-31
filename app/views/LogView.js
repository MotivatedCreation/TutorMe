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

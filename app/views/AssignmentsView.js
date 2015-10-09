var AssignmentsView = Parse.View.extend({

  el: ".container-fluid",

  initialize: function() {
  }
});

$(function() {
  new AssignmentsView();
  $('.activity-indicator-container').show();
});

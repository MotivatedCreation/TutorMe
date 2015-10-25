var ActivityIndicatorView = Parse.View.extend({

  el: ".container-fluid",

  template: _.template("<div class=\"activity-indicator-container\"><div class=\"activity-indicator-background glyphicon glyphicon-education\"></div><div class=\"activity-indicator glyphicon glyphicon-education\"></div><label class=\"activity-label\">This may take awhile... You should probably grab a beer.</label></div>"),

  initialize: function() {
    this.render();
  },

  render: function() {
    $(this.el).append(this.template);
  }
});

$(function() {
  new ActivityIndicatorView();
  $('.activity-indicator-container').hide();
});

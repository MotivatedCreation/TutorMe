var AssignmentsEntry = Parse.Object.extend({
  className: "Assignment"
});

var AssignmentsEntryView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#assignments-entry-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var AssignmentsView = Parse.View.extend({

  el: "#content-container",

  initialize: function() {
    this.fetchAssignments();
  },

  fetchAssignments: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[AssignmentsView] fetchAssignments');

    $('.activity-indicator-container').show();
    $('#assignments-table').hide();

    var self = this;

    var query = new Parse.Query('Assignment');

    query.find({
      success: function(assignments) {
        debugLog('[AssignmentsView] fetchAssignments success!');

        $('.activity-indicator-container').fadeOut(1000);
        $('#assignments-table').fadeIn(1000);

        self.loadAssignments(assignments);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  loadAssignments: function(assignments) {
    debugLog('[AssignmentsView] loadAssignments');

    for (var i = 0; i < assignments.length; i++)
    {
      var view = new AssignmentsEntryView({model: assignments[i]});
      $("#assignments-table").append(view.render().el);
    }
  }
});

$(function() {
  new AssignmentsView();
});

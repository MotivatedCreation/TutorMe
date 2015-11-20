var ClassEntry = Parse.Object.extend({
  className: "Class"
});

var ClassEntryView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#class-entry-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var ClassesView = Parse.View.extend({

  el: "#content-container",
  schedules: null,

  events: {
    'click #add-class-button' : 'showAddClassModal',
    'click #cancel-add-class-modal-button' : 'hideAddClassModal',
    'click #add-class-modal-button' : 'addClass',
    'click #remove-class-button' : 'removeClass'
  },

  initialize: function() {
    this.fetchClasses();
  },

  fetchClasses: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[ClassesView] fetchClasses');

    $('.activity-indicator-container').show();
    $('#classes-table').hide();

    var self = this;

    var query = new Parse.Query('Class');

    query.find({
      success: function(classes) {
        debugLog('[ClassesView] fetchClasses success!');

        $('.activity-indicator-container').fadeOut(1000);
        $('#classes-table').fadeIn(1000);

        self.loadClasses(classes);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  loadClasses: function(classes) {
    debugLog('[ClassesView] loadClasses');

    for (var i = 0; i < classes.length; i++)
    {
      var view = new ClassEntryView({model: classes[i]});
      $("#classes-table").append(view.render().el);
    }
  },

  showAddClassModal: function() {
    debugLog('[ClassesView] showAddClassModal');

    $('#add-class-modal').modal('show');
  },

  hideAddClassModal: function() {
    debugLog('[ClassesView] hideAddClassModal');

    $('#add-class-modal').modal('hide');
  },

  addClass: function() {
    $("#error-alert").remove();
    $("#success-alert").remove();

    debugLog('[ClassesView] addClass');

    var self = this;

    var className = $('#class-name-input').val();

    var Class = Parse.Object.extend('Class');

    var query = new Parse.Query('Class');
    query.equalTo('name', className);

    query.first({
      success: function(theClass) {
        debugLog('[ClassesView] addClass success!');

        if (!theClass) {
          var Class = Parse.Object.extend('Class');
          theClass = new Class();
        }

        theClass.set('name', $('#class-name-input').val());


        theClass.save(null, {
          success: function(success) {
            debugLog('[ClassesView] addClass success!');

            self.hideAddClassModal();
            location.reload();

            $(self.el).prepend($("#success-alert-template").html());

            $('#success-alert-label').text("Success! Your schedule has been successfully saved.");
          },
          error: function(error) {
            if (error)
              self.handleError(error);
          }
        });
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  removeClass: function(sender) {
    debugLog("[ClassesView] removeClass");

    $("#error-alert").remove();
    $("#success-alert").remove();

    var row = sender.currentTarget.parentNode.parentNode;
    var className = $(row).children('#class-name-label').text();

    var self = this;

    var Class = Parse.Object.extend('Class');

    var query = new Parse.Query('Class');
    query.equalTo('name', className);

    query.first({
      success: function(theClass) {
        debugLog('[ClassesView] removeClass success!');

        if (theClass) {

          theClass.destroy(null, {
            success: function(success) {
              debugLog('[ClassesView] destroyed!');
              
              row.remove();

              $(self.el).prepend($("#success-alert-template").html());

              $('#success-alert-label').text("Success! " + className + " has been successfully removed.");
            },
            error: function(error) {
              if (error)
                self.handleError(error);
            }
          });
        location.reload();
        }
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
  },

  handleError: function(error) {
    debugLog("[ClassesView] handleError");

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
  new ClassesView();
});

$("#add-class-form").submit(function() {
  $("#add-class-modal-button").click();
  return false;
});

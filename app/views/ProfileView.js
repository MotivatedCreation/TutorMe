var ProfileView = Parse.View.extend({

  el: "#content-container",

  events: {
    'click #edit-description-button': 'editDescription',
    'click #save-description-button': 'saveDescription'
  },

  initialize: function() {
    var currentUser = Parse.User.current();

    $('#full-name-label').text(currentUser.get('firstName') + " " + currentUser.get('lastName'));
    $('#account-type-label').text(this.stringForAccountType(currentUser.get('accountType')));
    $('#profile-description-well').text(currentUser.get('description'));
    $('#save-description-button').hide();
  },

  stringForAccountType: function(accountType) {
    debugLog('[ProfileView] stringForAccountType');

    var string = 'Student';

    if (accountType == 1)
      string = 'Tutor';
    else if (accountType == 2)
      string = 'Teacher';
    else if (accountType == 3)
      string = 'Admin';
    return string;
  },

  editDescription: function() {
    debugLog('[ProfileView] editDescription');

    $('#edit-description-button').hide();
    $('#save-description-button').show();
    $('#profile-description-well').attr('readonly', false);
    $('#profile-description-well').css('background-color', 'white');
    $('#profile-description-well').focus();

    return false;
  },

  saveDescription: function() {
    $("#invalid-input-alert").remove();
    $("#success-alert").remove();

    debugLog('[ProfileView] saveDescription');

    $('#edit-description-button').show();
    $('#save-description-button').hide();
    $('#profile-description-well').attr('readonly', true);
    $('#profile-description-well').css('background-color', 'default');

    var currentUser = Parse.User.current();
    var description = $('#profile-description-well').val();

    if (currentUser.get('description') != description)
    {
      var self = this;

      currentUser.set('description', description);

      currentUser.save(null, {
        success: function(success) {
          debugLog("[ProfileView] saveDescription success!");

          $(self.el).prepend($("#success-alert-template").html());

          $('#success-alert-label').text("Success! Your description has been successfully saved.");
        },
        error: function(error) {
          self.handleError(error);
        }
      });
    }
    else {
      $(this.el).prepend($("#success-alert-template").html());

      $('#success-alert-label').text("Success! Your description has been successfully saved.");
    }

    return false;
  },

  handleError: function(error) {
    debugLog("[ProfileView] handleError");

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
  new ProfileView;
});

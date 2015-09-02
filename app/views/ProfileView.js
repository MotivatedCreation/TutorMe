var ProfileView = Parse.View.extend({

  el: ".container-fluid",

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

    return string;
  },

  editDescription: function() {
    debugLog('[ProfileView] editDescription');

    $('#edit-description-button').hide();
    $('#save-description-button').show();
    $('#profile-description-well').focus();
    $('#profile-description-well').attr('readonly', false);
    $('#profile-description-well').css('background-color', 'white');
  },

  saveDescription: function() {
    debugLog('[ProfileView] saveDescription');

    $('#edit-description-button').show();
    $('#save-description-button').hide();
    $('#profile-description-well').attr('readonly', true);
    $('#profile-description-well').css('background-color', 'default');
  }
});

$(function() {
  new ProfileView;
});

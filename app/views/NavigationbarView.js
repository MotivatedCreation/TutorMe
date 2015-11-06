var NavigationbarView = Parse.View.extend({

  el: "#navigationbar",

  events: {
    'click #login-or-signUp-button' : 'showAuthenticationModal',
    'click #logout-link' : 'logOut',
    'click #check-in-link' : 'checkIn',
    'click #check-out-link' : 'checkOut'
  },

  initialize: function() {
    updateAuthenticationState();

    $('#check-out-link').hide();
  },

  handleError: function(error) {
    debugLog("[NavigationbarView] handleError");

    switch(error.code) {
      default: {
      }
      break;
    }
  },

  showAuthenticationModal: function() {
    debugLog('[NavigationbarView] showAuthenticationModal');

    $('#login-or-signUp-modal').modal('show');
  },

  logOut: function() {
    debugLog('[NavigationbarView] logOut');

    logOut();
  },

  toggleOnCheckInButton: function() {
    debugLog('[NavigationbarView] toggleOnCheckInButton');

    $('#check-in-link').show();
    $('#check-out-link').hide();
  },

  toggleOffCheckInButton: function() {
    debugLog('[NavigationbarView] toggleOffCheckInButton');

    $('#check-in-link').hide();
    $('#check-out-link').show();
  },

  checkIn: function() {
    debugLog('[NavigationbarView] checkIn');

    var self = this;

    checkIn().then(function(user) {
      debugLog("[NavigationbarView] checkIn success!");

      // Get the current cached user
      var currentUser = Parse.User.current();

      // Only toggle the check in button if the user is
      // of type tutor.
      if (currentUser.get('accountType') == 1)
        toggleOffCheckInButton();

    }, function(error) {
      if (error)
        self.handleError();
    });
  },

  checkOut: function() {
    debugLog('[NavigationbarView] checkOut');

    var self = this;

    checkOut().then(function(user) {
      debugLog("[NavigationbarView] checkOut success!");

      // Get the current cached user
      var currentUser = Parse.User.current();

      // Only toggle the check in button if the user is
      // of type tutor.
      if (currentUser.get('accountType') == 1)
        toggleOnCheckInButton();

    }, function(error) {
      if (error)
        self.handleError();
    });
  },

  updateAvailableTutorLabel: function() {
    debugLog('[NavigationbarView] updateAvailableTutorLabel');

    if (availableTutor
        && availableTutor.get('accountType') == 1
        && availableTutor.get('isCheckedIn')) {

        $('#available-tutor-label').removeClass('label-danger');
        $('#available-tutor-label').addClass('label-success');
        $('#available-tutor-label').text('Available Tutor: ' + availableTutor.get('firstName') + " " + availableTutor.get('lastName'));
    }
    else {
      $('#available-tutor-label').removeClass('label-success');
      $('#available-tutor-label').addClass('label-danger');
      $('#available-tutor-label').text('Available Tutor: N/A');
    }
  }
});

//Hides the checkin button if the user is not a tutor
function hideCheckIn() {
  var currentUser = Parse.User.current();
    if(currentUser.get('accountType') != 1) {
      $('#check-in-link').hide();
    }
}

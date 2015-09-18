var NavigationbarView = Parse.View.extend({

  el: "#navigationbar",

  events: {
    'click #login-or-signUp-button' : 'showAuthenticationModal',
    'click #logout-link' : 'logOut',
    'click #check-in-link' : 'checkIn'
  },

  initialize: function() {
    updateAuthenticationState();
  },

  showAuthenticationModal: function() {
    debugLog('[NavigationbarView] showAuthenticationModal');

    $('#login-or-signUp-modal').modal('show');
  },

  logOut: function() {
    debugLog('[NavigationbarView] logOut');

    logOut();
  },

  checkIn: function() {
    debugLog('[NavigationbarView] checkIn');

    checkIn();
  }
});

$(function()
{
  new NavigationbarView();
});

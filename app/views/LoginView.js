var LoginView = Parse.View.extend({
  events: {
    'click #forgot-password-link' : 'forgotPassword',
    'click #login-modal-button' : 'login'
  },

  initialize: function() {

  },

  login: function() {
    $("#invalid-input-alert").remove();
    $("#success-alert").remove();

    var email = $('#login-email-input').val().toLowerCase();
    var password = $('#login-password-input').val();

    if (!email || !password)
      $(this.el).prepend($("#invalid-input-alert-template").html());

    if (!email) {
      debugLog("[LoginOrSignUp(Login)] Invalid Email");

      $('#invalid-input-alert-label').text("Please enter a valid Email.");
      $('#login-email-input').focus();
    }
    else if (!password) {
      debugLog("[LoginOrSignUp(Login)] Invalid Password");

      $('#invalid-input-alert-label').text("Please enter a Password.");
      $('#login-password-input').focus();
    }
    else {
      debugLog("[LoginOrSignUp(Login)] logIn");

      var self = this;

      logIn(email, password).then(function() {
        $('#login-or-signUp-modal').modal('hide');
        window.location.href = "http://localhost/TutorMe/app/php/Profile.php";
      }, function(error) {
        if (error)
          self.handleError(error);
      });
    }
  },

  forgotPassword: function() {
    debugLog("[LoginOrSignUp(Login)] Forgot Email");

    $("#invalid-input-alert").remove();

    var email = document.getElementById('login-email-input').value.toLowerCase();

    if (!email) {
      $(this.el).prepend($("#invalid-input-alert-template").html());

      $('#invalid-input-alert-label').text("Please enter a valid Email.");
      $('#login-email-input').focus();
    }
    else {
      debugLog("[LoginOrSignUp(Login)] requestPasswordResetForEmail");

      var self = this;

      requestPasswordResetForEmail(email).then(function(success) {
        $(self.el).prepend($("#success-alert-template").html());

        $('#success-alert-label').text("Success! A link to reset your password has been sent to your email.");
      }, function(error) {
        if (error)
          self.handleError(error);
      });
    }
  },

  handleError: function(error) {
    $(this.el).append($("#invalid-input-alert-template").html());

    switch(error.code) {
      case Parse.Error.OBJECT_NOT_FOUND: {
        $('#invalid-input-alert-label').text("Invalid Email and/or Password.");
      }
      break;

      default: {
        $('#invalid-input-alert-label').text("An unknown error occurred.");
      }
      break;
    }
  }
});

$(function() {
  var loginView = new LoginView({el: '.modal-content'});
});


function test() {
  debugLog("TESTING");
}

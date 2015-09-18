var SignUpView = Parse.View.extend({
  events: {
    'click #signUp-modal-button' : 'signUp',
    'click #student-account-type': 'updateDropdownTitle',
    'click #tutor-account-type': 'updateDropdownTitle',
    'click #teacher-account-type': 'updateDropdownTitle'
  },

  initialize: function() {
  },

  signUp: function() {
    $("#invalid-input-alert").remove();

    var accountTypeLabel = $('#account-type-dropdown-label');
    var accountType = this.accountTypeFromString(accountTypeLabel.innerText || accountTypeLabel.textContent);

    var firstName = $('#signUp-first-name-input').val();
    var lastName = $('#signUp-last-name-input').val();
    var email = $('#signUp-email-input').val().toLowerCase();
    var password = $('#signUp-password-input').val();

    if (!firstName || !lastName || !email || !password) {
      $("#invalid-input-alert").remove();
      $(this.el).prepend($("#invalid-input-alert-template").html());
    }

    if (!firstName) {
      debugLog("[LoginOrSignUp(SignUp)] Invalid First Name");

      $('#invalid-input-alert-label').text("Please enter a First Name.");
      $('#signUp-first-name-input').focus();
    }
    else if (!lastName) {
      debugLog("[LoginOrSignUp(SignUp)] Invalid Last Name");

      $('#invalid-input-alert-label').text("Please enter a Last Name.");
      $('#signUp-last-name-input').focus();
    }
    else if (!email) {
      debugLog("[LoginOrSignUp(SignUp)] Invalid Email");

      $('#invalid-input-alert-label').text("Please enter a valid Email.");
      $('#signUp-email-input').focus();
    }
    else if (!password) {
      debugLog("[LoginOrSignUp(SignUp)] Invalid Password");

      $('#invalid-input-alert-label').text("Please enter a Password.");
      $('#signUp-password-input').focus();
    }
    else {
      debugLog("[LoginOrSignUp(SignUp)] signUp");

      var self = this;

      signUp(accountType, firstName, lastName, email, password).then(function() {
        $('#login-or-signUp-modal').modal('hide');
      }, function(error) {
        if (error) {
          self.handleError(error);
        }
      });
    }
  },

  handleError: function(error) {
    $(this.el).prepend($("#invalid-input-alert-template").html());

    switch(error.code) {
      case Parse.Error.USERNAME_TAKEN: {
        $('#invalid-input-alert-label').text("Email already signed up! Please enter a different email or login using the correct password.");
      }
      break;

      case Parse.Error.INVALID_EMAIL_ADDRESS: {
        $('#invalid-input-alert-label').text("Please enter a valid Email.");
      }
      break;

      default: {
        $('#invalid-input-alert-label').text("An unknown error occurred.");
      }
      break;
    }
  },

  accountTypeFromString: function(string) {
    var accountType = 0;

    if (string == "Tutor")
      accountType = 1;
    else if (string == "Teacher")
      accountType == 2;

    return accountType;
  },

  updateDropdownTitle: function(e) {
    var id = $(e.currentTarget).data("id");
    $('#account-type-dropdown-label').text(id);
  }
});

$(function() {
  var signUpView = new SignUpView({el: '.modal-content'});
});
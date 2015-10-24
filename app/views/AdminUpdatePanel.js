var SignUpView = Parse.View.extend({
  events: {
    'click #update-modal-button' : 'updateUser',
    'click #student-account-type': 'updateDropdownTitle',
    'click #tutor-account-type': 'updateDropdownTitle',
    'click #teacher-account-type': 'updateDropdownTitle'
  },

  initialize: function() {
  },

  updateUser: function() {
    $("#invalid-input-alert").remove();

    var accountTypeLabel = $('#account-type-dropdown-label');
    var accountType = this.accountTypeFromString(accountTypeLabel.innerText || accountTypeLabel.textContent);

    var firstName = $('#update-first-name-input').val();
    var lastName = $('#update-last-name-input').val();
    var email = $('#update-email-input').val().toLowerCase();
    var password = $('#update-password-input').val();

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

      updateUser(accountType, firstName, lastName, email, password).then(function() {
        $('#updateUser').modal('hide');
      }, function(error) {
        if (error) {
          self.handleError(error);
        }
      });
    }
  },

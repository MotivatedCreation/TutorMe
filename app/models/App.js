$(function() {
  Parse.initialize("xslcAHbM9lTaaUy6ZkO6c4lZkd0b1LvxA3vKSJ9B", "A9FjzLhTmZ97sziCmBUdImSyfbVwVZqkeFM6BuoH");
  Parse.$ = jQuery;
});

/** Global "Constants" **/

var kDebug = 1;

/** Global "Constants" End **/

/** Global "Enumerations" **/

var ErrorAction = Object.freeze({
  DisplayErrorAction: 0,
  IgnoreErrorAction: 1
});

/** Global "Enumerations" End **/

/*** Global Functions ***/

function debugLog(string) {
  if (kDebug)
    console.log(string);
}

function updateTutorAvailability() {
  debugLog('[App] updateTutorAvailability');

  var availableTutor = availableTutors[0];

  if (availableTutor.get('accountType') == 1
      && availableTutor.get('checkedInAt')) {

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

function updateAuthenticationState() {
  debugLog("[App] updateAuthenticationState");

  var currentUser = Parse.User.current();

  if (currentUser && Parse.User.current()) {
    debugLog("[App] updateAuthenticationState - Logged in");

    $('#authenticated-user-menu-button').show();
    $('#login-or-signUp-button').hide();

    if (currentUser.get('accountType') != 0)
      $('#check-in-link').hide();
    else
      $('#check-in-link').show();
  }
  else {
    debugLog("[App] updateAuthenticationState - Logged out");

    $('#authenticated-user-menu-button').hide();
    $('#login-or-signUp-button').show();
    $('#login-or-signUp-button').text('Login or Sign Up');
  }
}

function findAvailableTutor() {
  var promise = new Promise(function(resolve, reject) {
    var query = new Parse.Query(Parse.User);
    query.notEqualTo('checkedInAt', null);
    query.equalTo('accountType', 1);
    query.descending('checkedInAt');

    query.find({
      success: function(availableTutors) {
        debugLog('[App] updateTutorAvailability success!');

        if (availableTutors.length > 0)
          updateTutorAvailability();
      },
      error: function(error) {
        if (handleError(error) == ErrorAction['DisplayErrorAction'])
          reject(error);
        else
          reject();
      }
    });
  });

  return promise;
}

function checkIn() {
  var currentUser = Parse.User.current();

  if (currentUser) {
    debugLog('[App] checkIn');

    var promise = new Promise(function(resolve, reject) {
      var logEntry = new Parse.extend('LogEntry');

      currentUser.set('checkedInAt', new Date());
      currentUser.set('checkedOutAt', null);
      currentUser.save(null, {
        success: function(success) {
          debugLog('[App] checkIn success!');

          updateCheckInState();

          resolve();
        },
        error: function(error) {
          if (handleError(error) == ErrorAction['DisplayErrorAction'])
            reject(error);
          else
            reject();
        }
      });
    });

    return promise;
  }
}

function checkOut() {
  var currentUser = Parse.User.current();

  if (currentUser) {
    debugLog('[App] checkOut');

    var promise = new Promise(function(resolve, reject) {
      currentUser.set('checkedInAt', null);
      currentUser.set('checkedOutAt', new Date());
      currentUser.save(null, {
        success: function(success) {
          debugLog('[App] checkOut success!');

          updateCheckInState();

          resolve();
        },
        error: function(error) {
          if (handleError(error) == ErrorAction['DisplayErrorAction'])
            reject(error);
          else
            reject();
        }
      });
    });

    return promise;
  }
}

function logIn(email, password) {
  debugLog("[App] logIn(" + email + ", " + password + ")");

  var promise = new Promise(function(resolve, reject)
  {
    var options = {
      username: email,
      email: email,
      password: password
    };
    var user = new Parse.User(options);

    user.logIn(email, password).then(function(user) {
      debugLog("[App] logIn success!");

      updateAuthenticationState();

      resolve();

    }, function(error) {
      if (handleError(error) == ErrorAction['DisplayErrorAction'])
        reject(error);
      else
        reject();
    });
  });

  return promise;
}

function logOut() {
  debugLog("[App] logOut");

  Parse.User.logOut().then(function() {
    debugLog("[App] logOut success!");

    updateAuthenticationState();

    window.location = "http://tutorme.local";

  }, function(error) {
    handleError(error);
  });
}

function signUp(accountType, firstName, lastName, email, password) {
  debugLog("[App] signUp");

  var promise = new Promise(function(resolve, reject)
  {
    var user = new Parse.User();
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);
    user.set("accountType", accountType);
    user.set("firstName", firstName);
    user.set("lastName", lastName);

    if (accountType != 0)
      user.set("accountOnHold", true);
    else
      user.set("accountOnHold", false);

    user.signUp(null, {
      success: function(user) {
        debugLog("[App] signUp success!");

        updateAuthenticationState();

        resolve();
      },
      error: function(user, error) {
        if (handleError(error) == ErrorAction['DisplayErrorAction'])
          reject(error);
        else
          reject();
      }
    });
  });

  return promise;
}

function requestPasswordResetForEmail(email) {
  debugLog("[App] requestPasswordResetForEmail");

  var promise = new Promise(function(resolve, reject)
  {
    Parse.User.requestPasswordReset(email, {
      success: function(success) {
        debugLog("[App] requestPasswordResetForEmail success!");

        resolve();
      },
      error: function(error) {
        if (handleError(error) == ErrorAction['DisplayErrorAction'])
          reject(error);
        else
          reject();
      }
    });
  });

  return promise;
}

function saveDescription(string) {
  debugLog("[App] saveDescription");

  var promise = new Promise(function(resolve, reject)
  {
    var currentUser = Parse.User.current();
    currentUser.set('description', string);

    currentUser.save(null, {
      success: function(success) {
        debugLog("[App] saveDescription success!");

        resolve();
      },
      error: function(error) {
        if (handleError(error) == ErrorAction['DisplayErrorAction'])
          reject(error);
        else
          reject();
      }
    });
  });
}

function handleError(error) {
  debugLog("[App] Error: " + error.message + " Code: " + error.code);

  switch (error.code) {
    case Parse.Error.OBJECT_NOT_FOUND:
    case Parse.Error.USERNAME_TAKEN:
    case Parse.Error.INVALID_EMAIL_ADDRESS: {
      return ErrorAction['DisplayErrorAction'];
    }
    break;

    default: {
      return ErrorAction['IgnoreErrorAction'];
    }
    break;
  }
}

/** Global Functions End **/

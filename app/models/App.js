$(function() {
  Parse.initialize("xslcAHbM9lTaaUy6ZkO6c4lZkd0b1LvxA3vKSJ9B", "A9FjzLhTmZ97sziCmBUdImSyfbVwVZqkeFM6BuoH");
  Parse.$ = jQuery;

  navigationBarView = new NavigationbarView();

  var currentUser = Parse.User.current();

  if (currentUser && currentUser.get('accountType') == 1)
  {
    if (currentUser.get('isCheckedIn') == true)
      navigationBarView.toggleOffCheckInButton();
    else
      navigationBarView.toggleOnCheckInButton();
  }

  findAvailableTutor();
});

/** Variables **/

var availableTutor;
var navigationBarView;

/** Variables End **/

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

function updateAuthenticationState() {
  debugLog("[App] updateAuthenticationState");

  var currentUser = Parse.User.current();

  if (currentUser && Parse.User.current()) {
    debugLog("[App] updateAuthenticationState - Logged in");

    $('#authenticated-user-menu-button').show();
    $('#login-or-signUp-button').hide();

    if (currentUser.get('accountType') != 0) {
      $('#assignments-list-item').show();
    }
    else {
      $('#assignments-list-item').hide();
    }
  }
  else {
    debugLog("[App] updateAuthenticationState - Logged out");

    $('#assignments-list-item').hide();
    $('#authenticated-user-menu-button').hide();
    $('#login-or-signUp-button').show();
    $('#login-or-signUp-button').text('Login or Sign Up');
  }
}

function findAvailableTutor() {
  debugLog('[NavigationbarView] findAvailableTutor');

  var promise = new Promise(function(resolve, reject) {
    var query = new Parse.Query(Parse.User);
    query.equalTo('isCheckedIn', true);
    query.equalTo('accountType', 1);

    query.find({
      success: function(availableTutors) {
        debugLog('[NavigationbarView] findAvailableTutor success!');

        if (availableTutors.length > 0)
          availableTutor = availableTutors[0];
        else
          availableTutor = null;

        navigationBarView.updateAvailableTutorLabel();
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
      // Only change isCheckedIn if the account type is
      // of type tutor
      if (currentUser.get('accountType') == 1)
        currentUser.set('isCheckedIn', true);

      currentUser.save(null, {
        success: function(success) {
          debugLog('[App] checkIn success!');

          if (currentUser.get('accountType') == 1) {
            navigationBarView.toggleOffCheckInButton();

            findAvailableTutor();
          }
          else if (currentUser.get('accountType') == 0) {
            var LogEntry = Parse.Object.extend('LogEntry');
            var logEntry = new LogEntry();
            logEntry.set('student', Parse.User.current());

            logEntry.save();
          }

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
      // Only change isCheckedIn if the account type is
      // of type tutor
      if (currentUser.get('accountType') == 1)
        currentUser.set('isCheckedIn', false);

      currentUser.save(null, {
        success: function(success) {
          debugLog('[App] checkOut success!');

          if (currentUser.get('accountType') == 1)
          {
            navigationBarView.toggleOnCheckInButton();
            findAvailableTutor();
          }

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
      password: password,
      accountType: 0,
      isCheckedIn: false
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

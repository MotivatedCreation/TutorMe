$(function() {
  Parse.initialize("xslcAHbM9lTaaUy6ZkO6c4lZkd0b1LvxA3vKSJ9B", "A9FjzLhTmZ97sziCmBUdImSyfbVwVZqkeFM6BuoH");
  Parse.$ = jQuery;

  updateAuthenticationState();
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

function updateAuthenticationState() {
  if (Parse.User.current()) {
    $('#profile-link').show();
    $('#login-or-signUp-button').text('Logout');
  }
  else {
    $('#profile-link').hide();
    $('#login-or-signUp-button').text('Login or Sign Up');
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

    $('#login-or-signUp-button').text("Login or Sign Up");
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

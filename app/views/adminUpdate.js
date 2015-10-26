function findInfo() {
    debugLog("Initializing findInfo");
    //Get the email
    var email = document.getElementById('email-field').value

    //Attempt Parse Query
    var User = Parse.Object.extend('User');
    var query = new Parse.Query(User);

    //Attempt to find a user by email
    query.equalTo('email', email);
    query.first({
      success: function(user) {
        var userLName = user.get('lastName');
        placeInfo(user);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
    debugLog("findInfo Complete");
}

function placeInfo(user) {
  debugLog('Initializing placeInfo');
  var fName = user.get('firstName');
  var lName = user.get('lastName');
  var email = user.get('email');
  var password = user.get('password');

  document.getElementById("update-first-name-input").value = fName;
  document.getElementById("update-last-name-input").value = lName;
  document.getElementById("update-email-input").value = email;
  document.getElementById("update-password-input").value = password;
  debugLog('placeInfo complete');
}

function updateInfo() {
  debugLog("Initializing updateInfo");
  var email = document.getElementById("update-email-input").value;
  var User = Parse.Object.extend('User');

  var query = new Parse.Query(User);
  query.equalTo('email', email);
  query.first({
    success: function(user) {
      debugLog("Updating user");
      updateUser(user);
    },
    error: function(error) {
      if (error)
        self.handleError(error);
    }
  });
  debugLog('updateInfo complete');
}

function updateUser(user) {
  debugLog("Initializing updateUser");
  var fName = document.getElementById("update-first-name-input").value;
  var lName = document.getElementById("update-last-name-input").value;
  var email = document.getElementById("update-email-input").value;

  user.set('firstName', fName);
  user.set('lastName', lName);
  //User.set('password', password);

  debugLog("Attempting Save");

  Parse.Cloud.run('hello', {}, {
    success: function (result) {
      console.log(result);
    },
    error: function (error) {
      console.log(error);
    }
  });

  Parse.Cloud.useMasterKey();

}

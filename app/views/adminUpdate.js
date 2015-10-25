function findInfo() {
    //Get the email
    var email = document.getElementById('email-field').value
    debugLog("The email is " + email);

    //Attempt Parse Query
    debugLog("attempting Parse Query");
    var User = Parse.Object.extend('User');
    var query = new Parse.Query(User);
    debugLog("Parse Query Succesful");

    //Attempt to find a user by email
    query.equalTo('email', email);
    query.find({
      success: function(User) {
        debugLog('Found User success!');
        var userLName = User[0].get('lastName');
        debugLog('Testing : ' + userLName);
        placeInfo(User);
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
}

function placeInfo(User) {
  debugLog('Initializing placeInfo');
  var fName = User[0].get('firstName');
  var lName = User[0].get('lastName');
  var email = User[0].get('email');
  var password = User[0].get('password');
  debugLog('first Name : ' + fName);
  debugLog('last name : ' + lName);
  debugLog('email : ' + email);

  document.getElementById("update-first-name-input").value = fName;
  document.getElementById("update-last-name-input").value = lName;
  document.getElementById("update-email-input").value = email;
  document.getElementById("update-password-input").value = password;
}

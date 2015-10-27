/* adminUpdate.js
Javascript functions used in adminUpdate.php
*/

//findInfo() retrieves a Parse User by email and places their information
//in the update user modal
function findInfo() {
    debugLog("findInfo");
    var email = document.getElementById('email-field').value  //Get the Email in the email-field textbox
    if(email == "") {                                         //If it is empty return an error
      $('#emailError').modal('show');
      return;
    }
    $('#updateUser').modal('show');                           //Otherwise open the updateUser modal
    var User = Parse.Object.extend("User");                   //Using the Parse User Table
    var query = new Parse.Query(User);                        //Make a query on the User Table
    query.equalTo('email', email);                            //Returns an array of Users with email = to email
    query.first({                                             //grab the first one
      success: function(user) {                               //if successful make it the object user
        placeInfo(user);                                      //if successful run placeInfo() on user
      },
      error: function(error) {
        if (error)
          self.handleError(error);
      }
    });
}

//placeInfo(user) takes a user and puts their values in the updateUser modal
function placeInfo(user) {
  debugLog("placeInfo");
  var fName = user.get('firstName');                        //Get the values from user
  var lName = user.get('lastName');
  var email = user.get('email');
  //var password = user.get('password');
  //var aType = user.get('accountType');
  //var aString = aTypetoAString(aType);

  //document.getElementById("account-type-dropdown").innerHTML = aString;     //Put them in the updateUser modal
  document.getElementById("update-first-name-input").value = fName;
  document.getElementById("update-last-name-input").value = lName;
  document.getElementById("update-email-input").value = email;
  //document.getElementById("update-password-input").value = password;
}

//updateInfo() will save the user information that's bee placed in the modal
function updateInfo() {
  debugLog("updateInfo");
  var fName = document.getElementById("update-first-name-input").value;   //Get the values from the modal
  var lName = document.getElementById("update-last-name-input").value;
  var email = document.getElementById("update-email-input").value;
  var aString = $('#account-type-dropdown-label').text();                 //unfortunately returns a string
  var aType = aStringtoAType(aString);                                    //Turns the string into an int based on value
  Parse.Cloud.run('updateUSER',                                           //Runs our parse cloud function updateUSER
  { email: email,                                                         //send values in JSON
    aType : aType,
    fName: fName,
    lName: lName }, {
    success: function(status) {
      debugLog("SaveSuccess");
      $('#updateUser').modal('hide');
    },
    error: function(error) {
    }
  });
}
//aTypeToAString returns a string based on the accountType of the user to be updated
//Unused at the moment
function aTypetoAString(num) {
  if(num == 0) return "Student";
  if(num == 1) return "Tutor";
  if(num == 2) return "Teacher";
  if(num == 3) return "Admin";
}
//aStringtoAType(string) returns an int based on a string.
//Used for account types
function aStringtoAType(string) {
  if(string === "Student") return 0;
  if(string === "Tutor") return 1;
  if(string === "Teacher") return 2;
  if(string === "Admin") return 3;
}

//textSub() is for when the email-field textbox submits
function textSub() {
  findInfo()
}

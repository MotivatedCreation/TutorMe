/* UserLevel.js
  Functions used to make sure that users have the appropriate level and if they don't
  returns them to index.
*/

//redirect() redirects to the index page
function redirect() {
  window.location.href = "http://localhost/TutorMe/index.php";
}

//Checks if addmin
function checkAdmin() {
  debugLog("test");
  var currentUser = Parse.User.current();
  if(currentUser) {
    if(currentUser.get('accountType') < 3) {    //If user is account type tutor
      redirect();
    }
  }
  else {
    redirect();
  }
}

//checkTeacher() checks if the current use is Teacher, and if they are not
//redirect()'s to the index
function checkTeacher() {
  var currentUser = Parse.User.current();
  if(currentUser) {
    if(currentUser.get('accountType') < 2) {    //If user is account type teacher
      redirect();
    }
  }
  else {
    redirect();
  }
}

//checkTutor() checks if the current use is Tutor, and if they are not
//redirect()'s to the index
function checkTutor() {
  var currentUser = Parse.User.current();
  if(currentUser) {
    if(currentUser.get('accountType') < 1) {    //If user is account type tutor
      redirect();
    }
  }
  else {
    redirect();
  }
}

function noTeacher() {
  var currentUser = Parse.User.current();
  if(currentUser) {
    if(currentUser.get('accountType') == 2) {    //If user is account type tutor
      redirect();
    }
  }
  else {
    redirect();
  }
}

//checkStudent() checks if their is a current user, and if they are not
//redirect()'s to the index
function checkStudent() {
  var currentUser = Parse.User.current();
  if(!currentUser) redirect();
}

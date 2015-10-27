/* Admin.js
  For use with admin pages
*/

//redirect() redirects to the index page
function redirect() {
  window.location.href = "../.././index.php";
}

//checkAdmin() checks if the current use is admin, and if they are not
//redirect()'s to the index
function checkAdmin() {
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

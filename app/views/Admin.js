function redirect() {
  window.location.href = "../.././index.php";
}

function checkAdmin() {
  var currentUser = Parse.User.current();
  if(currentUser) {
    if(currentUser.get('accountType') < 3) {
      redirect();
    }
  }
  else {
    redirect();
  }
}

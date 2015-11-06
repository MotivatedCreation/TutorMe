function getPic() {
  debugLog("getPicture()");
  var email = Parse.User.current().get('email');
    debugLog("  Current user: " + email);
  var Picture = Parse.Object.extend("Picture");
  var query = new Parse.Query(Picture)
  query.equalTo("email",email);
  query.first({
    success: function(Pic) {
      debugLog("Getting Picture");
      if(!Pic)
        debugLog("Get a pic");
      else {
        debugLog("Acquiring Picture");
        var image = Pic.get('picture').url();
        debugLog("Picture: " + image);
        document.getElementById("profilePic").src = image;
      }
    },
    error: function(error) {
      debugLog("Failed Getting Picture");
      if (error)
        self.handleError(error);
    }
  });
}

function getPic() {
  debugLog("getPic()");
  var email = Parse.User.current().get('email');
    debugLog("  Current user: " + email);
  var Pic = Parse.User.current().get('picture');
  if(!Pic)
    debugLog("Get a pic");
  else {
    debugLog("Acquiring Picture");
    var image = Parse.User.current().get('picture').url();
    debugLog("Picture: " + image);
    document.getElementById("profilePic").src = image;
  }
}

function changePic() {
  debugLog("changePic()");
  var email = Parse.User.current().get('email');
  var Pic = Parse.User.current().get('picture')
  var newpic = $("#inputFile")[0];
  if(!Pic) {
    addPic();
    $("profilePic").reload();
    return;
  }
  if (newpic.files.length > 0) {
    var file = newpic.files[0];
    debugLog("File: " + file);
    var name = "photo.png";
    var parseFile = new Parse.File(name, file);
    debugLog("newFile: " + parseFile);
    parseFile.save().then(function() {
      debugLog("File has been saved");
      }, function(error) {
    });
    Parse.User.current().set('picture', parseFile);
    debugLog("Picture has been set: " + Pic);
    Parse.User.current().save(null, {
      success: function(Pic) {
        Pic.set("email", email);
        Pic.set("picture", parseFile);
        Pic.save();
        debugLog("Save should have been a success");
        location.reload();
      }
      });
    }
}

function addPic() {
  debugLog("AddPic()");
  var email = Parse.User.current().get('email');
  debugLog("  Current user: " + email);
  var newpic = $("#inputFile")[0];
  if (newpic.files.length > 0) {
      var file = newpic.files[0];
      debugLog("File: " + file);
      var name = "photo.png";
      var parseFile = new Parse.File(name, file);
      debugLog("newFile: " + parseFile);
      parseFile.save().then(function() {
        debugLog("File has been saved");
        }, function(error) {
      });
    Parse.User.current().set("email", email);
      Parse.User.current().set("picture", parseFile);
      debugLog("Picture has been set");
      Parse.User.current().save(null, {
        success: function(success) {
          Parse.User.current().set("picture", parseFile);
          Parse.User.current().save();
          debugLog("Save should have been a success");
          location.reload();
        }
      });
    }
}

function getPicByEmail(email) {
  debugLog("getPicByEmail()");
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
        return image;
      }
    },
    error: function(error) {
      debugLog("Failed Getting Picture");
      if (error)
        self.handleError(error);
    }
  });
}

function getPic() {
  debugLog("getPic()");
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

function changePic() {
  debugLog("changePic()");
  var email = Parse.User.current().get('email');
  debugLog("  Current user: " + email);
  var Picture = Parse.Object.extend("Picture");
  var newpic = $("#inputFile")[0];
  var query = new Parse.Query(Picture)
  query.equalTo("email",email);
  query.first({
    success: function(Pic) {
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
        Pic.set("picture", parseFile);
        debugLog("Picture has been set: " + Pic);
        Pic.save(null, {
          success: function(Pic) {
            Pic.set("email", email);
            Pic.set("picture", parseFile);
            Pic.save();
            debugLog("Save should have been a success");
            location.reload();
          }
        });
      }
    },
    error: function(error) {
      debugLog("Failed saving Picture");
      if (error)
        self.handleError(error);
    }
  });

}

function addPic() {
  debugLog("AddPic()");
  var email = Parse.User.current().get('email');
  debugLog("  Current user: " + email);
  var newpic = $("#inputFile")[0];
  var Picture = Parse.Object.extend("Picture");
  var Pic = new Picture();
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
      Pic.set("email", email);
      Pic.set("picture", parseFile);
      debugLog("Picture has been set: " + Pic);
      Pic.save(null, {
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

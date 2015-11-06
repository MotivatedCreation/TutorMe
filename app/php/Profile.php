<!-- Profile.php
  The profile page of the account section
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>TutorMe - Profile</title>

  <!-- Bootstrap -->
  <link href="../../bootstrap-3.3.5/css/bootstrap.min.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="../../bootstrap-3.3.5/js/bootstrap.min.js"></script>

  <link href="../../css/Profile.css" rel="stylesheet">
  <link href="../../css/Global.css" rel="stylesheet">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.5.0.min.js"></script>
  <script type="text/javascript" src="../models/App.js"></script>
  <script type="text/javascript" src="../views/ProfileView.js"></script>
  <script type="text/javascript" src="../views/UserLevel.js"></script>
  <script type="text/javascript" src="../views/picture.js"></script>

  <?php include('./Global.php'); ?>
</head>

<body onload="checkStudent(); getPic();">
  <!-- Container -->
  <div class="container-fluid">
  <!--  <?php include('../php/LoginOrSignUp.php'); ?> <!-- LOGIN SIGNUP POPUP -->
    <!-- Navigation Content Container -->
    <div class="container-fluid">
      <!-- Navigationbar -->
      <?php include('./Navigationbar.php'); ?>  <!-- NAVIGATION BAR -->
      <!-- Navigationbar end -->
    </div>
    <!-- Navigation Content Container -->

    <!-- Content Container -->
    <div id="content-container" class="container-fluid">
      <?php include('./AccountMenu.php'); ?> <!-- ACCOUNT MENU SIDE MENU -->

      <div id="content-container" class="container-fluid">
        <div id="profile-media-content-container" class="media">
<!-- PROFILE PICTURE -->
        <!----  <div class="media-left">
            <a href="#"><input type="file" id="logo">
              <img id="profilePic" class="media-object" src="" onclick="changePic()">
            </a>
          </div> -->
          <div class="media-left">
            <label for="inputFile">
              <img id="profilePic" class="media-object" src="../../images/basic.jpg" >
            </label>
            <input id="inputFile" type="file" onchange="changePic()"/>
          </div>
<!--EDIT AND SAVE YOUR DESCRIPTION -->
          <div id="profile-body" class="media-body">
            <h4 class="media-heading"></h4>
            <label id="full-name-label"></label>
            <br />
            <label id="account-type-label"></label>
            <br />
            <button id="edit-description-button" class="btn btn-primary btn-sm">Edit</button>
            <button id="save-description-button" class="btn btn-success btn-sm">Save</button>
            <br />
            <textarea id="profile-description-well" class="well well-sm" readonly="true">Add a description...</textarea>
          </div>
<!-- END -->
        </div>
      </div>

      <script type="text/template" id="error-alert-template">
        <div id="error-alert" class="alert alert-danger">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <label id="error-alert-label" class="text-center"></label>
       </div>
      </script>

      <script type="text/template" id="success-alert-template">
        <div id="success-alert" class="alert alert-success">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <label id="success-alert-label"></label>
       </div>
      </script>

    </div>
    <!-- Content Container End -->
  </div>
  <!-- Container End -->
</body>

</html>

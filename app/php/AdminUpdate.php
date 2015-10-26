<!-- Admin.php
A page for Admin commands

No where near finished.  Thinking of doing a pop up like the log in but that's hard
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>TutorMe - Admin</title>

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

  <link href="../../css/Admin.css" rel="stylesheet">
  <link href="../../css/Global.css" rel="stylesheet">
  <link href="../../css/AdminUpdate.css" rel="stylesheet">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.5.0.min.js"></script>
  <script type="text/javascript" src="../models/App.js"></script>

  <script type="text/javascript" src="../views/Admin.js"></script>
  <script type="text/javascript" src="../views/adminUpdate.js"></script>
  <?php include('./Global.php'); ?>
  <?php include('./AdminUpdatePanel.php'); ?>
</head>

<body onload="checkAdmin()">
  <!-- Container -->
  <div class="container-fluid">
    <?php include('../php/LoginOrSignUp.php'); ?> <!-- LOGIN SIGNUP POPUP -->
    <!-- Navigation Content Container -->
    <div class="container-fluid">
      <!-- Navigationbar -->
      <?php include('./Navigationbar.php'); ?>  <!-- NAVIGATION BAR -->
      <!-- Navigationbar end -->
    </div>
    <!-- Navigation Content Container -->
    <!-- Content Container -->
    <dionclick="myFunction()" v id="content-container" class="container-fluid">
      <?php include('./AdminMenu.php'); ?> <!-- ACCOUNT MENU SIDE MENU -->

      <div id="content-container" class="container-fluid">
        <form id="emailField">  <!-- WHERE YOU CHOOSE WHICH EMAIL TO UPDATE -->
            <label id="email-label"> Enter Email Address of User to Update </label>
              <div><input id="email-field" type="text"   placeholder="student@student.com">
             <button id="email-search-button" class="btn btn-default" data-toggle="modal" data-target="#updateUser" onclick="findInfo()"  type="button"><i class="glyphicon glyphicon-search"></i></button>
            </div>
        </form>
      </div>




      </div>
    </div>
</body>

<!-- Log.php
  Shows a log of What time student's were tutored and for what.
  Probably shouldn't be visible unless logged in as tutor+
  That would mean doesn't need the login/signup button unless navbar requires that

  Search bar should have a search by type
  Or maybe have the log organize by type
  Probably needs a date
-->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>TutorMe - Log</title>

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

  <link href="../../css/Log.css" rel="stylesheet">
  <link href="../../css/Global.css" rel="stylesheet">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.5.0.min.js"></script>
  <script type="text/javascript" src="../models/App.js"></script>

  <?php include('./Global.php'); ?>
</head>

<body>
  <!-- Container -->
  <div class="container-fluid">
    <?php include('../php/LoginOrSignUp.php'); ?> <!-- includes login or signup Popup  DO I REALLY NEED?-->
    <!-- Navigation Content Container -->
    <div class="container-fluid">
      <!-- Navigationbar -->
      <?php include('./Navigationbar.php'); ?>  <!-- includes the navigation bar -->
      <!-- Navigationbar end -->
    </div>
    <!-- Navigation Content Container End -->

    <!-- Content Container -->
    <div id="content-container" class="container-fluid">
      <!-- Action Container -->
      <div class="container-fluid">
        <!-- Alert Content -->
        <div id="alert-error" class="alert alert-danger" role="alert" style="display:none">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <label id="#alert-error-label"></label>
        </div>
        <!-- Alert Content End -->

        <!-- Action Content Group -->
<!-- THE SEARCH BAR -->
        <div id="action-content-group" class="input-group">
          <input type="text" class="form-control" style = "width: 400px;"  placeholder="Search">
          <div class="input-group-btn">
            <!-- B set the search button margin right so it'll stick to the textbox -->
            <button class="btn btn-default" type="submit" style="margin-right:1000px" ><i class="glyphicon glyphicon-search"></i></button>
          </div>
        </div>
<!-- END -->
        <!-- Action Content Group End -->
      </div>
      <!-- Action Container End -->

<!-- THE ACTUAL LOG LIST -->
      <!-- Log Template -->
      <table id="log-table" class="table table-bordered table-hover">
        <tr>
          <th>Time</th>
          <th>Student Name</th>
          <th>Class</th>
          <th>Teacher</th>
          <th>Tutor</th>
        </tr>
      </table>
      <!-- Log Template End -->

<!-- LOG ENTRY TEMPLATE -->
      <!-- Log Entry Template -->
      <script type="text/template" id="log-entry-template">
        <td><%= createdAt %></td>
        <td><%= student['firstName'] %></td>
        <td><%= classNumber %></td>
        <td></td>
        <td></td>
      </script>
      <!-- Log Entry Template End-->
    </div>
    <!-- Content Container End -->
  </div>
  <!-- Container End -->
  <script type="text/javascript" src="../views/LogView.js"></script>
</body>

</html>

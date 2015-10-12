<!-- Navigationbar.php
  The Navigation Bar at the top of each page.
-->

<nav id="navigationbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
<!-- The Navigation Bar -->
  <div class="container-fluid">
<!-- TutorMe label/button : Takes you to the index-->
    <div class="navbar-header">
      <?php if (kCurrentFile == 'index.php'): ?>
        <a class="navbar-brand" href="index.php">
      <?php else: ?>
        <a class="navbar-brand" href="../../index.php">
      <?php endif; ?>

        <span style="margin-right:10px;" class="glyphicon glyphicon-education" aria-hidden="true"></span>
        TutorMe
      </a>

    </div>
<!-- The rest of the left hand side buttons -->
    <ul class="nav navbar-nav">
<!-- Log Button -->
        <li <?php if (kCurrentFile == 'Log.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Log.php">
        <?php else: ?>
          <a href="./Log.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-align-left"></div>
          Log
        </a>
      </li>
<!-- Schedule Button -->
        <li <?php if (kCurrentFile == 'Schedule.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Schedule.php">
        <?php else: ?>
          <a href="./Schedule.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-calendar"></div>
          Schedule
        </a>
      </li>
<!-- Tutors Button -->
      <li <?php if (kCurrentFile == 'Tutors.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Tutors.php">
        <?php else: ?>
          <a href="./Tutors.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-user"></div>
          Tutors
        </a>
      </li>
<!-- Assignments button : Shows up only if ? -->
      <li id="assignments-list-item"<?php if (kCurrentFile == 'Assignments.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Assignments.php">
        <?php else: ?>
          <a href="./Assignments.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-file"></div>
          Assignments
        </a>
      </li>
<!-- ADMIN HERE -->
      <li id="admin-list-item"<?php if (kCurrentFile == 'Admin.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Admin.php">
        <?php else: ?>
          <a href="./Admin.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-lock"></div>
          Admin
        </a>
      </li>
    </ul>
<!-- End the left hand side buttons and now the Right hand side buttons -->
    <ul class="nav navbar-nav pull-right">
<!-- Available Tutor -->
      <li>
        <span id="available-tutor-label" class="label label-danger">Available Tutor: N/A</span>
      </li>
<!-- The account button ? Only shows when ? -->
      <li>
      <div id="authenticated-user-menu-button" class="dropdown" style="padding-top: 8px;">
          <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
            <li>
              <?php if (kCurrentFile == 'index.php'): ?>
                <a href="./app/php/Profile.php">
              <?php else: ?>
                <a href="./Profile.php">
              <?php endif; ?>

                <div style="margin-right:10px;" class="glyphicon glyphicon-info-sign"></div>
                Account
              </a>
            </li>
            <li><a id="check-in-link" href="#">
              <div style="margin-right:10px;" class="glyphicon glyphicon-check"></div>
              Check in</a></li>
            <li><a id="check-out-link" href="#">
              <div style="margin-right:10px;" class="glyphicon glyphicon-unchecked"></div>
              Check out</a></li>
            <li><a id="logout-link" href="#">
              <div style="margin-right:10px;" class="glyphicon glyphicon-log-out"></div>
              Logout</a></li>
          </ul>
        </div>
      </li>
<!-- The Login or Sign up Button -->
      <li>
        <button id="login-or-signUp-button" type="button" class="btn btn-primary">Login or Sign Up</button>
      </li>
    </ul>
    <!-- End of right hand buttons and the nav bar -->
  </div>
  <div>
  </div>
</nav>

<!-- Navbar Javascripts -->
<?php if (kCurrentFile == 'index.php'): ?>
  <script type="text/javascript" src="./app/views/NavigationbarView.js"></script>
<?php else: ?>
  <script type="text/javascript" src="../views/NavigationbarView.js"></script>
<?php endif; ?>

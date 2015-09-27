<nav id="navigationbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <?php if (kCurrentFile == 'index.php'): ?>
        <a class="navbar-brand" href="index.php">
      <?php else: ?>
        <a class="navbar-brand" href="../../index.php">
      <?php endif; ?>

        <span style="margin-right:10px;" class="glyphicon glyphicon-home" aria-hidden="true"></span>
        TutorMe
      </a>

    </div>
    <ul class="nav navbar-nav">
        <li <?php if (kCurrentFile == 'Log.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Log.php">
        <?php else: ?>
          <a href="./Log.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-align-center"></div>
          Log
        </a>
      </li>
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
      <li id="assignments-list-item"<?php if (kCurrentFile == 'Assignments.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Assignments.php">
        <?php else: ?>
          <a href="./Assignments.php">
        <?php endif; ?>

          <div style="margin-right:10px;" class="glyphicon glyphicon-tasks"></div>
          Assignments
        </a>
      </li>
    </ul>
    <ul class="nav navbar-nav pull-right">
      <li>
        <span id="available-tutor-label" class="label label-danger">Available Tutor: N/A</span>
      </li>
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
      <li>
        <button id="login-or-signUp-button" type="button" class="btn btn-primary">Login or Sign Up</button>
      </li>
    </ul>
  </div>
</nav>

<?php if (kCurrentFile == 'index.php'): ?>
  <script type="text/javascript" src="./app/views/NavigationbarView.js"></script>
<?php else: ?>
  <script type="text/javascript" src="../views/NavigationbarView.js"></script>
<?php endif; ?>

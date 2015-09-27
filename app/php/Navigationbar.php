<nav id="navigationbar" class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <?php if (kCurrentFile == 'index.php'): ?>
        <a class="navbar-brand" href="index.php">TutorMe</a>
      <?php else: ?>
        <a class="navbar-brand" href="../../index.php">TutorMe</a>
      <?php endif; ?>
    </div>
    <ul class="nav navbar-nav">
        <li <?php if (kCurrentFile == 'Log.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Log.php">Log</a>
        <?php else: ?>
          <a href="./Log.php">Log</a>
        <?php endif; ?>
      </li>
        <li <?php if (kCurrentFile == 'Schedule.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Schedule.php">Schedule</a>
        <?php else: ?>
          <a href="./Schedule.php">Schedule</a>
        <?php endif; ?>
      </li>
      <li <?php if (kCurrentFile == 'Tutors.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Tutors.php">Tutors</a>
        <?php else: ?>
          <a href="./Tutors.php">Tutors</a>
        <?php endif; ?>
      </li>
      <li id="assignments-list-item"<?php if (kCurrentFile == 'Assignments.php'): ?> class="active" <?php endif; ?>>
        <?php if (kCurrentFile == 'index.php'): ?>
          <a href="./app/php/Assignments.php">Assignments</a>
        <?php else: ?>
          <a href="./Assignments.php">Assignments</a>
        <?php endif; ?>
      </li>
    </ul>
    <ul class="nav navbar-nav pull-right">
      <li>
        <span id="available-tutor-label" class="label label-danger">Available Tutor: N/A</span>
      </li>
      <li>
      <div id="authenticated-user-menu-button" class="dropdown" style="padding-top: 8px;">
          <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
            <li>
              <?php if (kCurrentFile == 'index.php'): ?>
                <a href="./app/php/AccountMenu.php">Account</a>
              <?php else: ?>
                <a href="./AccountMenu.php">Account</a>
              <?php endif; ?>
            <li><a id="check-in-link" href="#">Check in</a></li>
            <li><a id="check-out-link" href="#">Check out</a></li>
            <li><a id="logout-link" href="#">Logout</a></li>
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

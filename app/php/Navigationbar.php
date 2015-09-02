<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
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
                <a href="./app/php/Profile.php">Profile</a>
              <?php else: ?>
                <a href="./Profile.php">Profile</a>
              <?php endif; ?>
            <li><a href="#">Check in</a></li>
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

<script type="text/javascript">
$(function() {
  $('#login-or-signUp-button').click(function() {
    $('#login-or-signUp-modal').modal('show');
  });

  $('#logout-link').click(function() {
    logOut();
  });
});
</script>

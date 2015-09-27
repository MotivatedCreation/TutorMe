<div id="profile-menu-content-container" class="list-group pull-left">
  <button id="profile-menu-profile-button" type="button" class="list-group-item<?php if (kCurrentFile == 'Profile.php'): ?> active <?php endif; ?>">Profile</button>
  <button id="profile-menu-appointments-button" type="button" class="list-group-item<?php if (kCurrentFile == 'Appointments.php'): ?> active <?php endif; ?>">Appointments</button>
  <button id="profile-menu-classes-button" type="button" class="list-group-item<?php if (kCurrentFile == 'Classes.php'): ?> active <?php endif; ?>">Classes</button>
  <button id="profile-menu-schedule-button" type="button" class="list-group-item<?php if (kCurrentFile == 'ScheduleEditor.php'): ?> active <?php endif; ?>">Schedule</button>
  <button id="profile-menu-timelog-button" type="button" class="list-group-item<?php if (kCurrentFile == 'TimeLog.php'): ?> active <?php endif; ?>">Time Log</button>
</div>

<script type="text/javascript">
$(function() {
  var currentUser = Parse.User.current();

  if (currentUser && currentUser.get('accountType') == 1) {
    $('#profile-menu-schedule-button').show();
    $('#profile-menu-timelog-button').show();
  }
  else {
    $('#profile-menu-schedule-button').hide();
    $('#profile-menu-timelog-button').hide();
  }

  $('#profile-menu-profile-button').click(function() {
    window.location.href = "./Profile.php";
  });

  $('#profile-menu-appointments-button').click(function() {
    window.location.href = "./Appointments.php";
  });

  $('#profile-menu-classes-button').click(function() {
    window.location.href = "./Classes.php";
  });

  $('#profile-menu-schedule-button').click(function() {
    window.location.href = "./ScheduleEditor.php";
  });

  $('#profile-menu-timelog-button').click(function() {
    window.location.href = "./TimeLog.php";
  });
});
</script>

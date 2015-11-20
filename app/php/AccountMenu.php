<!-- AccountMenu.php
  The Account Menu side menu
-->

<!-- Account Levels:
1 idk
2 idk
3 idk
4 idk
-->

<!-- All the left hand buttons. Shows depending on user tier -->
<div id="profile-menu-content-container" class="list-group pull-left">  <!-- The profile picture -->
  <button id="profile-menu-profile-button" type="button" class="list-group-item<?php if (kCurrentFile == 'Profile.php'): ?> active <?php endif; ?>">Profile</button>
  <button id="profile-menu-appointments-button" type="button" class="list-group-item<?php if (kCurrentFile == 'Appointments.php'): ?> active <?php endif; ?>">Appointments</button>
  <button id="profile-menu-classes-button" type="button" class="list-group-item<?php if (kCurrentFile == 'Classes.php'): ?> active <?php endif; ?>">Classes</button>
  <button id="profile-menu-schedule-button" type="button" class="list-group-item<?php if (kCurrentFile == 'ScheduleEditor.php'): ?> active <?php endif; ?>">Schedule</button>
  <button id="profile-menu-timelog-button" type="button" class="list-group-item<?php if (kCurrentFile == 'TimeLog.php'): ?> active <?php endif; ?>">Time Log</button>
    <button id="profile-menu-teacherassignments-button" type="button" class="list-group-item">Assignments</button>
</div>
<!-- End -->

<script type="text/javascript">
$(function() {
  var currentUser = Parse.User.current();                 //current user = the current user from parse

  $('#profile-menu-appointments-button').hide();

  if (currentUser &&
      (currentUser.get('accountType') == 0 || currentUser.get('accountType') == 1))
  {
    $('#profile-menu-appointments-button').show();
  }

  if (currentUser && currentUser.get('accountType') == 1) { //if their is a current user and the account is type 1
    $('#profile-menu-schedule-button').show();      //Show the schedule button
    $('#profile-menu-timelog-button').show();       //show the timelog button
  }
  else {
    $('#profile-menu-schedule-button').hide();    //else don't show those buttons
    $('#profile-menu-timelog-button').hide();
  }

  if (currentUser && currentUser.get('accountType') == 2) { //if their is a current user and the account is type 2
    $('#profile-menu-teacherassignments-button').show();      //Show the Assignments button
  }
  else {
    $('#profile-menu-teacherassignments-button').hide();    //else don't show that button
  }

	//When you click on for buttons to pages
 $('#profile-menu-teacherassignments-button').click(function() {
    window.location.href = "./TeacherAssignments.php";
  });

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

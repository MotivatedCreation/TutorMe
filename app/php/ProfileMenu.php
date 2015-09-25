<div id="profile-menu-content-container" class="list-group pull-left">
  <button type="button" class="list-group-item active">Profile</button>
  <button type="button" class="list-group-item ">Classes</button>
  <button id="profile-menu-schedule-button" type="button" class="list-group-item ">Schedule</button>
</div>

<script type="text/javascript">
$(function() {
  var currentUser = Parse.User.current();

  if (currentUser && currentUser.get('accountType') == 1)
    $('#profile-menu-schedule-button').show();
  else
    $('#profile-menu-schedule-button').hide();
});
</script>
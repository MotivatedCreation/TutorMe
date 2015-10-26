<!-- AdminMenu.php
  The Admin Menu side menu
-->

<div id="admin-menu-content-container" class="list-group pull-left">
  <button id="admin-menu-update-button" type="button" class="list-group-item<?php if (kCurrentFile == 'AdminUpdate.php'): ?> active <?php endif; ?>">Update User Account</button>
  <button id="admin-menu-update-button" type="button" class="list-group-item">Placeholder</button>
  <button id="admin-menu-update-button" type="button" class="list-group-item">Placeholder</button>
</div>

<script type="text/javascript">
$(function() {
  $('#admin-menu-update-button').click(function() {
    window.location.href = "./AdminUpdate.php";
  });
});
</script>

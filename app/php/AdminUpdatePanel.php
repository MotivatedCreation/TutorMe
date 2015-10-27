<!-- AdminUpdatePanel.php
Contains the Modals used in AdminUpdate.php
-->
<div id="updateUser" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Update User Information</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div id="AdminUpdatePanel-modal-content-container" class="col-md-6">
              <form>
              <!-- Choose an account type -->
                <div class="form-group">
                  <label for="update-account-type-label" class="control-label">Account Type:</label>
                    <div class="dropdown">
                      <button class="btn btn-default dropdown-toggle" type="button" id="account-type-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        <label id="account-type-dropdown-label" style="font-weight: normal;">Student</label>
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a id="student-account-type" data-id="Student" href="#">Student</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a id="tutor-account-type" data-id="Tutor" href="#">Tutor</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a id="teacher-account-type" data-id="Teacher" href="#">Teacher</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a id="admin-account-type" data-id="Admin" href="#">Admin</a></li>
                    </ul>
                  </div>
                </div>
                <!-- Update the Name -->
                <div class="form-group">
                  <label for="update-first-name-label" class="control-label">First Name:</label>
                  <input type="text" class="form-control" id="update-first-name-input" value="">
                </div>
                <div class="form-group">
                  <label for="updatelast-name-label" class="control-label">Last Name:</label>
                  <input type="text" class="form-control" id="update-last-name-input" value="">
                </div>
                <!-- Update the Email -->
                <div class="form-group">
                  <label for="update-email-label" class="control-label" >Email:</label>
                  <input type="text" class="form-control" id="update-email-input" value="" readonly>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-md-6">
              <button id="update-modal-button" type="button" class="btn btn-primary" onclick="updateInfo()">Update Information</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

<!--Modal that displays if you forget an email address -->
<div id="emailError" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">You forgot the Email</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div id="AdminUpdatePanel-modal-content-container" class="col-md-6">
            <form>
              Make sure you put an email address in
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

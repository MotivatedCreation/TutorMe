<!-- LoginOrSignUp.php
  The login or signup Popup
-->

<?php if (kCurrentFile == 'index.php'): ?>
  <script type="text/javascript" src="./app/views/LoginView.js"></script>
  <script type="text/javascript" src="./app/views/SignUpView.js"></script>
<?php else: ?>
  <script type="text/javascript" src="../views/LoginView.js"></script>
  <script type="text/javascript" src="../views/SignUpView.js"></script>
<?php endif; ?>

<div class="modal fade" id="login-or-signUp-modal" tabindex="-1" role="dialog" aria-labelledby="login-or-signUp-modal-label">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="row">
          <div class="col-md-6">
            <h4 id="signUp-modal-label">Sign Up</h4>
          </div>
          <div class="col-md-6">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 id="login-modal-label">Login</h4>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="row">
          <div id="signUp-modal-content-container" class="col-md-6">
            <form>
              <div class="form-group">
                <label for="signUp-account-type-label" class="control-label">Account Type:</label>
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
                  </ul>
                </div>
              </div>
              <div class="form-group">
                <label for="signUp-first-name-label" class="control-label">First Name:</label>
                <input type="text" class="form-control" id="signUp-first-name-input" value="" placeholder="e.g. Albert">
              </div>
              <div class="form-group">
                <label for="signUp-last-name-label" class="control-label">Last Name:</label>
                <input type="text" class="form-control" id="signUp-last-name-input" value="" placeholder="e.g. Einstein">
              </div>
              <div class="form-group">
                <label for="signUp-email-label" class="control-label">Email:</label>
                <input type="text" class="form-control" id="signUp-email-input" value="" placeholder="e.g. whatis@nemail.com">
              </div>
              <div class="form-group">
                <label for="signUp-password-label" class="control-label">Password:</label>
                <input type="password" class="form-control" id="signUp-password-input" value="">
              </div>
            </form>
          </div>
          <div id="login-modal-content-container" class="col-md-6">
            <form>
              <div class="form-group">
                <label for="login-email-label" class="control-label">Email:</label>
                <input type="text" class="form-control" id="login-email-input" value="" placeholder="e.g. whatis@nemail.com">
              </div>
              <div class="form-group">
                <label for="login-password-label" class="control-label">Password:</label>
                <a id="forgot-password-link" class="pull-right" href="#">Forgot Password?</a>
                <input type="password" class="form-control" id="login-password-input" value="">
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row">
          <div class="col-md-6">
            <button id="signUp-modal-button" type="button" class="btn btn-primary">Sign Up</button>
          </div>
          <div class="col-md-6">
            <button id="login-modal-button" type="button" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script type="text/template" id="invalid-input-alert-template">
  <div id="invalid-input-alert" class="alert alert-danger">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <label id="invalid-input-alert-label" class="text-center"></label>
 </div>
</script>

<script type="text/template" id="success-alert-template">
  <div id="success-alert" class="alert alert-success">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <label id="success-alert-label"></label>
 </div>
</script>

<script type="text/javascript">
$(function() {
  $('#login-or-signUp-modal').on('hidden.bs.modal', function () {
    clearInputs();
  });
});

function clearInputs() {
  $('#account-type-dropdown-label').text("Student");

  $('#login-email-input').val("");
  $('#login-password-input').val("");

  $('#signUp-first-name-input').val("");
  $('#signUp-last-name-input').val("");
  $('#signUp-email-input').val("");
  $('#signUp-password-input').val("");

  $("#invalid-input-alert").remove();
  $("#success-alert").remove();
}
</script>

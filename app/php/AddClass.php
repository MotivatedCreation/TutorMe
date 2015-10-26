<!-- AddClass.php
  Add a class Pop up dialog box from the classes section on the account page
-->

<!-- Modal boxes are pop up boxes -->
<div class="modal fade" id="add-class-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="add-class-modal-label">Add Class</h4>
      </div>
      <div class="modal-body">
        <div id="add-class-modal-content-container">
          <form id="add-class-form">
            <div class="form-group">
              <label for="class-name-label" class="control-label">Class Name:</label> <!-- text on the modal panel -->
              <input type="text" class="form-control" id="class-name-input" value="" placeholder="e.g. CSCI 540"> <!-- add class text box -->
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <div>
          <button id="cancel-add-class-modal-button" type="button" class="btn btn-default">Cancel</button>
          <button id="add-class-modal-button" type="button" class="btn btn-primary">Add Class</button>
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

<!-- I'm guessing this clears the text box once you have added a class -->
<script type="text/javascript">
$(function() {
  $('#add-class-modal').on('hidden.bs.modal', function () {
    clearInputs();
  });
});

function clearInputs() {
  $('#class-name-input').val("");
}
</script>

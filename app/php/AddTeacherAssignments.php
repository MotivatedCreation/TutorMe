<!-- AddTeacherAssignments.php
  Add a assignment Pop up dialog box from the assignments section on the account page
-->

<!-- Modal boxes are pop up boxes -->
<div class="modal fade" id="add-teacherassignments-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="add-teacherassignments-modal-label">Add Assignment</h4>
      </div>
      <div class="modal-body">
        <div id="add-teacherassignments-modal-content-container">
			<form>
			<div class="form-group">
                <label for="teacherassignments-url-label" class="control-label">URL:</label>
                <input type="text" class="form-control" id="teacherassignments-url-input" value="">
            </div>
			
			<div class="form-group">
                <label for="teacherassignments-title-label" class="control-label">Assignment Title:</label>
                <input type="text" class="form-control" id="teacherassignments-title-input" value="" placeholder="e.g. 200 Assignment 2">
            </div>
			
			<div class="form-group">
				<label for="teacherassignments-title-label" class="control-label"></label>
                <textarea id="teacherassignments-description-input" class="well well-sm" value="" placeholder="Add a comment here"></textarea>
            </div>  
			</form>
        </div>
      </div>
      <div class="modal-footer">
        <div>
          <button id="cancel-add-teacherassignments-modal-button" type="button" class="btn btn-default">Cancel</button>
          <button id="add-teacherassignments-modal-button" type="button" class="btn btn-primary">Add Assignment</button>
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

<!-- clears the text box once you have added an assignment -->
<script type="text/javascript">
$(function() {
  $('#add-teacherassignments-modal').on('hidden.bs.modal', function () {
    clearInputs();
  });
});

function clearInputs() {
  $('#teacherassignments-url-input').val("");
  $('#teacherassignments-title-input').val("");
  $('#teacherassignments-description-well').val("");
}
</script>

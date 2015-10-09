<div class="modal fade" id="add-appointment-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="add-appointment-modal-label">Make an Appointment</h4>
      </div>
      <div class="dropdown">
		<button class="btn btn-default dropdown-toggle" type="button" id="select-tutor-dropdown" data-toggle="Tutor Name" aria-haspopup="true" aria-expanded="true">
		<label>Select Tutor Name</label>
		<span class="caret"></span>
		</button>
		<ul class="dropdown-menu" aria-labelledby="select-tutor-dropdown">
			<li><a href="#">Johnathan Sullivan</a></li>
			<li><a href="#">Someone Else</a></li>
		</ul>
	  </div>
	  <label>Select Date: </label>
		<div id="datepicker" class="input-group date" data-date-format="mm-dd-yyyy">
			<input class="form-control" type="text" readonly />
			<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
		</div>
	  <form action="action_page.php">
		<label>Select Time: </label>
		<input type="time" name="usr_time">
	  </form>
      <div class="modal-footer">
        <div>
          <button id="cancel-add-appointment-modal-button" type="button" class="btn btn-default">Cancel</button>
          <button id="add-appointment-modal-button" type="button" class="btn btn-primary">Submit</button>
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
  $('#add-appointment-modal').on('hidden.bs.modal', function () {
    clearInputs();
  });
});

function clearInputs() {
  $('#appointment-name-input').val("");
}
</script>

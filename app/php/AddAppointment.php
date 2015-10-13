<div class="modal fade" id="add-appointment-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="add-appointment-modal-label">Make an Appointment</h4>
      </div>
      <div class="dropdown">
		<label class="col-xs-3 control-label">Select Tutor:</label>
			<button class="btn btn-default dropdown-toggle" type="button" id="select-tutor-dropdown" data-toggle="Tutor Name" aria-haspopup="true" aria-expanded="true">
				<span class="caret"></span>
			</button>
		<ul class="dropdown-menu" aria-labelledby="select-tutor-dropdown">
			<li><a href="#">Johnathan Sullivan</a></li>
			<li><a href="#">Someone Else</a></li>
		</ul>
	  </div>
	<div class="control-group">
        <label class="col-xs-3 control-label" for="date-picker-2" class="control-label">Select Date:</label>
            <div class="input-group">
                <input id="date-picker-2" type="text" class="date-picker form-control" />
                <label for="date-picker-2" class="input-group-addon btn"><span class="glyphicon glyphicon-calendar"></span>
                </label>
            </div>
    </div>
		<div class="timepicker">
			<label class="col-xs-3 control-label">Select Time:</label>
			<input type="time" name="usr_time">
		</div>
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
<script type="text/javascript">
$(function() {
  $('#add-appointment-modal').on('hidden.bs.modal', function () {
    clearInputs();
  });
});

$(".date-picker").datepicker();

$(".date-picker").on("change", function () {
    var id = $(this).attr("id");
    var val = $("label[for='" + id + "']").text();
    $("#msg").text(val + " changed");
});

function clearInputs() {
  $('#appointment-name-input').val("");
}
</script>

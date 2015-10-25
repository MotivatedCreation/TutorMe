<div class="modal fade" id="add-appointment-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h4 id="add-appointment-modal-label">Schedule Appointment</h4>
      </div>

      <div class="container-fluid" id="appointment-container">

        <div id="datetimepicker-content-container" style="overflow: hidden;">
          <div class="form-group">
            <div class="row">
              <div class="col-md-12">
                <div id="datetimepicker"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="appointment-content-container">
          <div class="row">
            <div class="col-md-6">
              <div class="pull-right" id="tutor-dropdown-content-container">
                <label class="control-label">Tutor:</label>
                <div class="dropdown" id="tutor-dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <label id="tutor-dropdown-label" style="font-weight: normal;">Select a Tutor...</label>
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" id="tutor-dropdown-menu" aria-labelledby="dropdownMenu">
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="pull-left" id="time-dropdown-content-container">
                <label class="control-label">Time:</label>
                <div class="dropdown" id="appointment-time-dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <label style="font-weight: normal;">Select a Time...</label>
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="modal-footer">
        <div>
          <button id="cancel-add-appointment-modal-button" type="button" class="btn btn-default">Cancel</button>
          <button id="add-appointment-modal-button" type="button" class="btn btn-primary">Submit</button>
        </div>
      </div>

    </div>
  </div>
</div>

<script type="text/template" id="dropdown-selection-template">
  <a id="<%= firstName %>-<%= lastName %>" data-id="<%= firstName %><%= lastName %>" href="#"><%= firstName %> <%= lastName %></a>
  <script type="text/javascript">
  $("#<%= firstName %>-<%= lastName %>").click(function(event) {
    $('#tutor-dropdown-label').text(event.currentTarget.text);
  });
  </script>
</script>

<script type="text/template" id="success-alert-template">
  <div id="success-alert" class="alert alert-success">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <label id="success-alert-label"></label>
  </div>
</script>

<script type="text/template" id="invalid-input-alert-template">
  <div id="invalid-input-alert" class="alert alert-danger">
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <label id="invalid-input-alert-label" class="text-center"></label>
  </div>
</script>

<script type="text/javascript">
$(function () {
  var appointmentsView = new AppointmentsView();

  $('#datetimepicker').datetimepicker({
    format: 'MM/dd/YYYY',
    inline: true
  }).on('dp.change', function() {
    appointmentsView.loadTutorDropdown();
  });
});
</script>

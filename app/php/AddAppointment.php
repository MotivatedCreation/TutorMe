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
                  <button class="btn btn-default dropdown-toggle disabled" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
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
                <div class="dropdown" id="time-dropdown">
                  <button class="btn btn-default dropdown-toggle disabled" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <label id="time-dropdown-label" style="font-weight: normal;">Select a Time...</label>
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" id="time-dropdown-menu" aria-labelledby="dropdownMenu">
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="row">

            <div class="col-md-6">
              <div class="pull-right" id="class-dropdown-content-container">
                <label class="control-label">Class:</label>
                <div class="dropdown" id="class-dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <label id="class-dropdown-label" style="font-weight: normal;">Select a Class...</label>
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" id="class-dropdown-menu" aria-labelledby="dropdownMenu">
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="pull-left" id="teacher-dropdown-content-container">
                <label class="control-label">Teacher:</label>
                <div class="dropdown" id="teacher-dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <label id="teacher-dropdown-label" style="font-weight: normal;">Select a Teacher...</label>
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" id="teacher-dropdown-menu" aria-labelledby="dropdownMenu">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="modal-footer">
        <div>
          <button id="cancel-schedule-appointment-modal-button" type="button" class="btn btn-default">Cancel</button>
          <button id="schedule-appointment-modal-button" type="button" class="btn btn-primary disabled">Schedule</button>
          <button id="reschedule-appointment-modal-button" type="button" class="btn btn-primary disabled">Reschedule</button>
        </div>
      </div>

    </div>
  </div>
</div>

<script type="text/template" id="tutor-dropdown-selection-template">
  <a id="<%= objectId %>" data-id="<%= objectId %>" href="#"><%= firstName %> <%= lastName %></a>
  <script type="text/javascript">
  $("#tutor-dropdown li a").click(function(event) {
    $(this).trigger('tutor-dropdown:changed');
  });
  </script>
</script>

<script type="text/template" id="time-dropdown-selection-template">
  <a id="<%= objectId %>" data-id="<%= objectId %>" href="#"><%= convertToTwelveHourTime(startTime) %> - <%= convertToTwelveHourTime(endTime) %></a>
  <script type="text/javascript">
  $("#time-dropdown li a").click(function(event) {
    $(this).trigger('time-dropdown:changed');
  });
  </script>
</script>

<script type="text/template" id="class-dropdown-selection-template">
  <a id="<%= objectId %>" data-id="<%= objectId %>" href="#"><%= name %></a>
  <script type="text/javascript">
  $("#class-dropdown li a").click(function(event) {
    $(this).trigger('class-dropdown:changed');
  });
  </script>
</script>

<script type="text/template" id="teacher-dropdown-selection-template">
  <a id="<%= objectId %>" data-id="<%= objectId %>" href="#"><%= firstName %> <%= lastName %></a>
  <script type="text/javascript">
  $("#teacher-dropdown li a").click(function(event) {
    $(this).trigger('teacher-dropdown:changed');
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
    inline: true,
    minDate: new Date()
  }).on('dp.change', function() {
    appointmentsView.loadAvailableTutors();
  });
});
</script>

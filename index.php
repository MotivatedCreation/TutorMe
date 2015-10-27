<!DOCTYPE html>

<!-- The Homepage -->

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
  <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
  <title>TutorMe - Home</title>

  <!-- Bootstrap -->
  <link href="./bootstrap-3.3.5/css/bootstrap.min.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
  <!-- Include all compiled plugins (below), or include individual files as needed -->
  <script src="./bootstrap-3.3.5/js/bootstrap.js"></script>

  <link href="./css/index.css" rel="stylesheet">
  <link href="./css/Global.css" rel="stylesheet">
  <link href="./css/footer.css" rel="stylesheet">

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.5.0.min.js"></script>
  <script type="text/javascript" src="./app/models/App.js"></script>

  <link rel='shortcut icon' href='./app/favicon.ico' type='image/x-icon' />
</head>

<body>
  <?php include('./app/php/Global.php'); ?>
  <!-- Container -->
  <div class="container-fluid">
    <?php include('./app/php/LoginOrSignUp.php'); ?>    <!-- The Login or Signup pop up -->
    <!-- Navigation Content Container -->
    <div class="container-fluid">
      <!-- Navigationbar -->
      <?php include('./app/php/Navigationbar.php'); ?>  <!-- The whole navbar -->
      <!-- Navigationbar end -->
    </div>
    <!-- Navigation Content Container -->

    <div class="row" id="featuresHeading">
      <div class="col-12">
        <h2></h2>
        <p class="lead">                                                                                                                                                                                                                                               </p>
      </div><!-- end col-12 -->
    </div><!-- end featuresHeading -->

    <div class="carousel slide" id="myCarousel">
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li class="active" data-slide-to="0" data-target="#myCarousel"></li>
        <li data-slide-to="1" data-target="#myCarousel"></li>
        <li data-slide-to="2" data-target="#myCarousel"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div class="item active" id="slide1">
          <div class="carousel-caption">
            <h4>Hodge 326</h4>
            <p>CS Tutoring Lab</p>
          </div><!-- end carousel-caption-->
        </div><!-- end item -->

        <div class="item" id="slide2">
          <div class="carousel-caption">
            <h4></h4>
            <p></p>
          </div><!-- end carousel-caption-->
        </div><!-- end item -->

        <div class="item" id="slide3">
          <div class="carousel-caption">
            <h4></h4>
            <p></p>
          </div><!-- end carousel-caption-->
        </div><!-- end item -->
      </div><!-- carousel-inner -->

      <!-- Controls -->
      <a class="left carousel-control" data-slide="prev" href="#myCarousel"><span class="icon-prev"></span></a>
      <a class="right carousel-control" data-slide="next" href="#myCarousel"><span class="icon-next"></span></a>

    </div><!-- end myCarousel -->


    <!-- Features Content Container -->
    <div class="container-fluid">
      <!-- Features -->
      <div class="row" id="features">
        <div class="col-sm-4 feature">
          <div class="panel panel-default">

            <div class="panel-heading">
              <h3 class="panel-title">Computer Science Club</h3>
            </div><!-- end panel-heading -->

            <div class="panel-body">
              <img src="images/Club.png" alt="HTML5" class="img-circle">

              <p>Computer Science Club has many events going on through the year. Check out the Club page to see what is going on!</p>
            </div>

            <div class="panel-footer">
              <a href="http://www.UpstateCS.club" target="_blank" class="btn btn-warning btn-block">Go To Club Page</a>
            </div>

          </div><!-- end panel -->
        </div><!-- end feature -->

        <div class="col-sm-4">
          <div class="feature">
          <div class="panel panel-default">

            <div class="panel-heading">
              <h3 class="panel-title">Chat With a Tutor</h3>
            </div><!-- end panel-heading -->

            <div class="panel-body">
              <img src="images/Chat.png" alt="CSS3" class="img-circle">

              <p>Need help but can't get to the lab? A tutor may be able to help you right away!<p>
            </div>

            <div class="panel-footer">
              <a href="#" class="btn btn-danger btn-block">Tutor Chat</a>
            </div>

          </div>
          </div><!-- end panel -->
        </div><!-- end feature -->

          <div class="col-sm-4 feature">
            <div class="panel panel-default">

              <div class="panel-heading">
                <h3 class="panel-title">Find the Tutor Lab</h3>
              </div><!-- end panel-heading -->

              <div class="panel-body">
                <img src="images/Map.png" alt="Bootstrap 3" class="img-circle">

                <p>The Tutoring Lab is on USC Upstate Main campus. Hodge building, room 236.</p>
              </div>

              <div class="panel-footer">
                <a href="#" class="btn btn-info btn-block" data-toggle="modal" data-target="#myModal">Campus Map</a>
              </div>

              <!-- Modal -->
              <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                      <img src="images/Upstatemap.jpg" alt="Upstate Map">

                    </div>
                  </div>
                </div>
              </div> <!-- end of Modal -->

            </div><!-- end panel -->
          </div><!-- end Features -->
        </div><!-- end Features -->
      </div><!-- end Features Container -->
    </div>
    <!-- Container End -->

    <!-- footer -->
    <?php include('./app/php/Footer.php'); ?>
    <!-- footer end -->

  </body>

  </html>

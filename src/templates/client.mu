<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="stylesheet" href="css/font-awesome.css">
    </head>
    <body class="peers-0">
        <div id="remotes"></div>

        <div id="avatar" title="Mute microphone">
            <video id="local" autoplay="autoplay" muted="true" class="local"></video>
            <span class="mute-icon fa fa-microphone-slash fa-4x"></span>
        </div>

        <div class="toolbar">
          <button id="orientation-switch" class="orientation-switch">
              Switch <span class="fa fa-th-large"></span>
          </button>
        </div>
        <script>
            var connectionServer = '{{connectionServer}}',
                room = '{{room}}';
        </script>

        <script src="client.js"></script>
    </body>
</html>

navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    var backCamera = devices.find(function(device) {
      return device.kind === 'videoinput' && device.label.includes('back');
    });

    if (backCamera) {
      navigator.mediaDevices.getUserMedia({ video: { deviceId: backCamera.deviceId } })
        .then(function(stream) {
          var videoElement = document.getElementById('videoElement');
          videoElement.srcObject = stream;

          var track = stream.getVideoTracks()[0];
          var capabilities = track.getCapabilities();
          if (capabilities && capabilities.transform) {
            track.applyConstraints({
              advanced: [{ transform: 'scaleX(-1)' }]
            })
              .catch(function(error) {
                console.log('Error applying constraints:', error);
              });
          } else {
            console.log('Camera does not support transform.');
          }
        })
        .catch(function(error) {
          console.log('Error accessing camera:', error);
        });
    } else {
      console.log('Back camera not found.');
    }
  })
  .catch(function(error) {
    console.log('Error enumerating devices:', error);
  });
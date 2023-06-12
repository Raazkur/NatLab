navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    var backCamera = devices.find(function(device) {
      return device.kind === 'videoinput' && device.label.includes('back');
    });

    if (backCamera) {
      navigator.mediaDevices.getUserMedia({ video: { deviceId: backCamera.deviceId } })
        .then(function(stream) {
          var videoElement = document.getElementById('videoElement');
          videoElement.srcObject = invertVideoStream(stream);
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

function invertVideoStream(stream) {
  var videoTrack = stream.getVideoTracks()[0];
  var settings = videoTrack.getSettings();
  settings.transform = [-1, 0, 0, 0, 1, 0, 0, 0, 1]; // Invert x-axis

  var newStream = new MediaStream();
  var newVideoTrack = videoTrack.clone();
  newVideoTrack.applyConstraints(settings);
  newStream.addTrack(newVideoTrack);

  return newStream;
}
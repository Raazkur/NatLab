navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
  .then(function (stream) {
    var videoElement = document.getElementById('videoElement');
    videoElement.srcObject = stream;
  })
  .catch(function (error) {
    console.log('Error accessing camera:', error);
  });
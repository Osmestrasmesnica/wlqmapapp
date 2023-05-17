function exportMapImage(format, fileName) {
  // Get the map element
  var mapElement = document.querySelector('.map-container');

  // Use dom-to-image to capture the map as an image in the specified format
  domtoimage.toBlob(mapElement, {
    quality: 1,
    bgcolor: '#FFFFFF'
  }).then(function(blob) {
    // Convert the image blob to a data URL and create a download link for the image
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(function(error) {
    console.error('Error capturing map:', error);
  });
}

// Listen for click events on the export buttons
document.getElementById('png').addEventListener('click', function() {
  exportMapImage('png', 'map.png');
});

document.getElementById('jpg').addEventListener('click', function() {
  exportMapImage('jpeg', 'map.jpg');
});

document.getElementById('tiff').addEventListener('click', function() {
  exportMapImage('tiff', 'map.tif');
});

document.getElementById('svg').addEventListener('click', function() {
  // Get the map element
  var mapElement = document.querySelector('.map-container');

  // Use dom-to-image to capture the map as an SVG
  domtoimage.toSvg(mapElement)
    .then(function(dataUrl) {
      // Create a download link for the image
      var link = document.createElement('a');
      link.download = 'map.svg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function(error) {
      console.error('Error capturing map:', error);
    });
});


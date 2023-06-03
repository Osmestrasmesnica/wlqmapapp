function exportMapImage(format, fileName) {
  // Get the map element
  var mapElement = document.querySelector('.img-wrapper');

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
  var selectedValue = document.getElementById('selected').value;
  var fileName = selectedValue ? selectedValue + '.png' : 'allData.png';
  exportMapImage('png', fileName);
});

document.getElementById('jpg').addEventListener('click', function() {
  var selectedValue = document.getElementById('selected').value;
  var fileName = selectedValue ? selectedValue + '.jpg' : 'allData.jpg';
  exportMapImage('jpeg', fileName);
});

document.getElementById('tiff').addEventListener('click', function() {
  var selectedValue = document.getElementById('selected').value;
  var fileName = selectedValue ? selectedValue + '.tif' : 'allData.tif';
  exportMapImage('tiff', fileName);
});

document.getElementById('svg').addEventListener('click', function() {
  // Get the map element
  var mapElement = document.querySelector('.img-wrapper');

  // Use dom-to-image to capture the map as an SVG
  domtoimage.toSvg(mapElement)
    .then(function(dataUrl) {
      var selectedValue = document.getElementById('selected').value;
      var fileName = selectedValue ? selectedValue + '.svg' : 'allData.svg';

      // Create a download link for the image
      var link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function(error) {
      console.error('Error capturing map:', error);
    });
});

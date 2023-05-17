// Get the button by its id
var button = document.getElementById("excel-button");

// Add an event listener to the button to handle file selection
button.addEventListener("click", function() {
  // Create a file input element
  var fileInput = document.createElement("input");
  fileInput.type = "file";

  // Add an event listener to the file input element to handle file selection
  fileInput.addEventListener("change", function() {
    // Get the selected file
    var file = fileInput.files[0];

    // Check if the selected file is an Excel file
    if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
      // Use a library such as XLSX or SheetJS to read the file and convert it to JSON
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        workbook.SheetNames.forEach(function(sheetName) {
          // Get the sheet data as JSON
          var sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          // Convert the sheet data to a string
          var sheetDataString = JSON.stringify(sheetData);

          // Create a blob from the sheet data string
          var sheetDataBlob = new Blob([sheetDataString], {type: "application/json"});

          // Create a download link for the sheet data
          var sheetDataLink = document.createElement("a");
          sheetDataLink.href = URL.createObjectURL(sheetDataBlob);
          sheetDataLink.download = sheetName + ".json";

          // Add the download link to the DOM
          document.body.appendChild(sheetDataLink);

          // Click the download link to start the download
          sheetDataLink.click();

          // Remove the download link from the DOM
          document.body.removeChild(sheetDataLink);
        });
      };
      reader.readAsBinaryString(file);
    } else {
      // Show an error message if the selected file is not an Excel file
      alert("Please select a valid Excel file");
    }
  });

  // Click the file input element to open the file selection dialog
  fileInput.click();
});

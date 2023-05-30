var WlqData;
var probaData;

    function importJSON() {
      return new Promise((resolve, reject) => {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {
          var file = e.target.files[0];
          var reader = new FileReader();

          reader.onload = e => {
            var data = JSON.parse(e.target.result);
            resolve(data);
          };

          reader.readAsText(file);
        };

        input.click();
      });
    };

    function showProbaData() {
      var select = document.getElementById("headerSelect");
      var selectedHeader = select.value;
      var probaData = WlqData.filter(item => item[selectedHeader] !== "Neprecizan podatak" && item[selectedHeader] !== undefined);
      console.log(probaData);
    }


    var selectedHeader;
    function showUniqueData(){
    var keys = Object.keys(WlqData[0]);
    for(var i = 1; i < WlqData.length; i++) {
        keys = keys.concat(Object.keys(WlqData[i])).filter((item, index, inputArray) => inputArray.indexOf(item) === index);
    }
    keys.sort();
    var select = document.getElementById("headerSelect");
    var selectValue = select.value;
    select.innerHTML = "";
    for (var i = 0; i < keys.length; i++) {
        var option = document.createElement("option");
        option.value = keys[i];
        option.text = keys[i];
        select.appendChild(option);
        if (keys[i] === selectValue) {
        select.value = selectValue;
        }
    }
    }


    function importFile(fileType) {
      return new Promise((resolve, reject) => {
        var input = document.createElement('input');
        input.type = 'file';
    
        input.onchange = e => {
          var file = e.target.files[0];
          var reader = new FileReader();
    
          reader.onload = e => {
            var data;
    
            if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
              // Parse Excel file using SheetJS library
              data = parseExcelData(e.target.result);
            } else if (fileType === 'text/csv') {
              // Parse CSV file using Papaparse library
              data = parseCSVData(e.target.result);
            }
    
            resolve(data);
          };
    
          reader.readAsBinaryString(file);
        };
    
        input.click();
      });
    }
    
    function parseExcelData(fileData) {
      // Use SheetJS or similar library to parse Excel file data
      // Return the parsed data as an array of objects
      // Example implementation using SheetJS library:
      var workbook = XLSX.read(fileData, { type: 'binary' });
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];
      var data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      var headers = data[0];
      var jsonData = [];
    
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var obj = {};
    
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j];
        }
    
        jsonData.push(obj);
      }
    
      return jsonData;
    }
    
    function parseCSVData(fileData) {
      // Use Papaparse or similar library to parse CSV file data
      // Return the parsed data as an array of objects
      // Example implementation using Papaparse library:
      var parsedData = Papa.parse(fileData, { header: true });
      return parsedData.data;
    }
        
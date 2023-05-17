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

    
let filteredData; //*! sto ne radi ovo globalna varijabla */
// Populate the select element with data from a previously imported JSON file
function populateSelect() {
    // Filter data based on specific conditions
    const filteredData = WlqData.filter(item => item.UTM_10x10 !== undefined && item.UTM_10x10 !== "Neprecizan podatak"); //! ovo treba da ispravis da bira ono sto si selektovao u dropdown//
    // Create a new object with relevant properties
    const mappedData = filteredData.map(item => {
                return {
                    vrsta: item.PunNazivTaksona,  //! OVO OBAVEZNO SREDITI DA ZNAS KOJA KOLONA SE UZIMA DA SE OVO NAPRAVI */
                    utm10x10: item.UTM_10x10, //! OVO OBAVEZNO SREDITI DA ZNAS KOJA KOLONA SE UZIMA DA SE OVO NAPRAVI */
                    podatak: item.Tip_podatka //! OVO OBAVEZNO SREDITI DA ZNAS KOJA KOLONA SE UZIMA DA SE OVO NAPRAVI */
                };
            });
    // Get unique values of the 'vrsta' property
    const vrstaValues = mappedData.map(item => item.vrsta);
    const uniqueVrstaValues = Array.from(new Set(vrstaValues));
    // Sort the values alphabetically
    uniqueVrstaValues.sort();
    console.log(uniqueVrstaValues.length);
    // Populate the select element with the unique values
        let selectElement = document.getElementById("selected");
    for (let i = 0; i < uniqueVrstaValues.length; i++) {
        selectElement.innerHTML += `<option value="${uniqueVrstaValues[i]}">${uniqueVrstaValues[i]}</option>`;
    }
}

function showSelectedValue(selectElement){
    var msg = document.getElementById('msg');
    msg.innerHTML = 'Izabran takson: <b>' + selectElement.options[selectElement.selectedIndex].text
}


function myFunction() {
    const selectedValue = document.querySelector("#selectTaxon").value;
    document.querySelector("#selectedTaxon").innerText = selectedValue;
}

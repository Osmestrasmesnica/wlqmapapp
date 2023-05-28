const importedData = new Promise((resolve, reject) => {
    if (!WlqData) {
        const intervalId = setInterval(() => {
        if (WlqData) {
            clearInterval(intervalId);
            resolve();
        }
        }, 50);
    } else {
        resolve();
    }
});

// Helper function to filter and map data
const filterAndMapData = (data) => {
    const filtered = data.filter(
      (podatak) => podatak.UTM_10x10 && podatak.UTM_10x10 !== "Neprecizan podatak" //!ovde treba da se promeni da umesto UTM_10x10, da se uzima kolona koja je selektovana u selecteru (".custom-select")
    );
  
    return filtered.map((i) => ({
      vrsta: i.PunNazivTaksona,
      utm10x10: i.UTM_10x10,
      podatak: i.Tip_podatka,
    }));
  };
  
  // Helper function to count occurrences of items in an array
  const countOccurrences = (arr) => {
    const count = {};
    for (const item of arr) {
      count[item] = count[item] ? count[item] + 1 : 1;
    }
    return count;
  };
  
  // Main function to load and process data
  const loadData = () => {
    const species = select.value !== "" ? select.value : input.value;
    selectedSpeciesData = mapData.filter((item) =>
      item.vrsta.includes(species) ? item : undefined
    );
  
    const UTMOdabraneVrste = [];
    const qwerty = [];
    const uniqueUTM = [];
  
    for (let i = 0; i < selectedSpeciesData.length; i++) {
      UTMOdabraneVrste.push(selectedSpeciesData[i].utm10x10);
  
      const uniqueUtmData = selectedSpeciesData[i].utm10x10;
      if (!uniqueUTM.includes(uniqueUtmData)) {
        uniqueUTM.push(uniqueUtmData);
      }
  
      // Filter data based on conditions
      const T = selectedSpeciesData.filter(
        (utm) =>
          utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
          utm.podatak.includes("Terenski")
      );
      const L = selectedSpeciesData.filter(
        (utm) =>
          utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
          utm.podatak.includes("Literaturni")
      );
      const O = selectedSpeciesData.filter(
        (utm) =>
          utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
          utm.podatak.includes("Usmeni")
      );
  
      // Determine the value of qwerty[i] based on conditions
      if (T.length > 0 && L.length > 0 && O.length > 0) {
        qwerty[i] = "TiLiO";
      } else if (T.length > 0 && L.length > 0) {
        qwerty[i] = "TiL";
      } else if (T.length > 0 && O.length > 0) {
        qwerty[i] = "TiO";
      } else if (L.length > 0 && O.length > 0) {
        qwerty[i] = "LiO";
      } else if (T.length > 0) {
        qwerty[i] = "T";
      } else if (L.length > 0) {
        qwerty[i] = "L";
      } else if (O.length >= 0) {
        qwerty[i] = "O";
      } else {
        console.log("nema bato nista");
      }
  
      // Add event listener for click
      const btnSelectedTaxon = document.querySelector(".togetherTaxa");
      btnSelectedTaxon.addEventListener("click", function () {
        const proba101 = UTMOdabraneVrste[i];
        let prvoSlovo1 = proba101.substring(0, 1);
        let drugoSlovo1 = proba101.substring(1, 2);
        let prviBroj1 = proba101.substring(2, 3);
        let drugiBroj1 = proba101.substring(3, 4);

        //*za prvo slovo
        proba101 === ""
          ? alert("Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!")
          : prvoSlovo1.includes("C")
          ? (document.getElementById(
              `product${i}`
            ).style.left = `calc(calc(0${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
          : prvoSlovo1.includes("D")
          ? (document.getElementById(
              `product${i}`
            ).style.left = `calc(calc(1${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
          : prvoSlovo1.includes("E")
          ? (document.getElementById(
              `product${i}`
            ).style.left = `calc(calc(2${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
          : prvoSlovo1.includes("F")
          ? (document.getElementById(
              `product${i}`
            ).style.left = `calc(calc(3${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
          : console.log("nista od navedenog");

        //*za drugo slovo
        drugoSlovo1.includes("M")
          ? (document.getElementById(
              `product${i}`
            ).style.top = `calc(calc(0${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
          : drugoSlovo1.includes("N")
          ? (document.getElementById(
              `product${i}`
            ).style.top = `calc(calc(1${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
          : drugoSlovo1.includes("P")
          ? (document.getElementById(
              `product${i}`
            ).style.top = `calc(calc(2${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
          : drugoSlovo1.includes("Q")
          ? (document.getElementById(
              `product${i}`
            ).style.top = `calc(calc(3${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
          : drugoSlovo1.includes("R")
          ? (document.getElementById(
              `product${i}`
            ).style.top = `calc(calc(4${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
          : drugoSlovo1.includes("S")
          ? (document.getElementById(
              `product${i}`
            ).style.top = `calc(calc(5${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
          : console.log("nista od navedenog nema");

         document.getElementById(`product${i}`).className = qwerty[i];
        });
  
      // Generate HTML output
      output1 += `<div class="product" id="product${i}"></div>`;
      document.querySelector(".products").innerHTML = output1;
    }
  
    console.log(
      `You have ${UTMOdabraneVrste.length} data for ${species} taxon and it is found inside ${uniqueUTM.length} UTM 10x10 squares`
    );
    console.log(`Title: "Unique UTM Values`);
    console.table(uniqueUTM);
  
    // Count occurrences of qwerty values
    const qwertyCount = countOccurrences(qwerty);
  
    let consoleOutput;
    if (UTMOdabraneVrste.length === 1) {
      consoleOutput = `For the species "${species}" we have the following data types present: ${qwertyCount}.`;
    } else if (UTMOdabraneVrste.length > 1) {
      let qwertyCountString = "";
      Object.entries(qwertyCount).forEach(([qwerty, count]) => {
        qwertyCountString += `${qwerty}: ${count}, `;
      });
      qwertyCountString = qwertyCountString.slice(0, -2);
      consoleOutput = `For the species "${species}" we have ${UTMOdabraneVrste.length} different occurrences with the following data types present: ${qwertyCountString}.`;
    }
  
    return consoleOutput;
  };
  
  // Event listeners for select and input elements
  const select = document.querySelector("#selected");
  const input = document.getElementById("selectTaxon");
  select.addEventListener("change", loadData);
  input.addEventListener("input", loadData);
  
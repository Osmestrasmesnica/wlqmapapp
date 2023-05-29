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

//! OVO JE DEO U KOME PODESAVAS GDE SE NALAZE PODACI ZA UTM I KOJE SVE PODATKE ZELIS DA PRIAKZES
//! EXCEL KOJI SE UNOSI MORA DA SADZI KOLONE "PunNazivTaksona", "UTM_10x10" i "Tip_podatka", sa donjim crtama
//TODO Videti kada stignes da ovde podesis da se klikcu kolone u kojima je sta i sta zelis da prikazes 
const filterAndMapData = (data) => {
  const filtered = data.filter(
    (podatak) => podatak.UTM_10x10 && podatak.UTM_10x10 !== "Neprecizan podatak"
  );

  return filtered.map((i) => ({
    vrsta: i.PunNazivTaksona, //! ovo moze da bude u bilo kom obliku
    utm10x10: i.UTM_10x10, //! ovo MORA da bude u formatu UTM iz Srbije ili da pise "Neprecizan podatak" - (2 slova C,D,E,F / M,N,P,Q,R,S + 2 broja 0-9 / 0-9)
    podatak: i.Tip_podatka, //!ovo MORA da sadrzi nazive "Terenski" , "Literaturni", "Usmeni",
  }));
};

let selectedSpeciesData; //vrsta koju selektujes u ili pises u input
let UTMOdabraneVrste;
let output = "";
let tipPodatakaPoUTM;
let productsContainer = document.querySelector(".products"); // Dohvatanje elementa koji sadrži proizvode

importedData.then(() => {
  const mapData = filterAndMapData(WlqData);

  function loadData() {
    let TipPodatkaOdabraneVrste = [];
    UTMOdabraneVrste = [];
    tipPodatakaPoUTM = [];
    var T = new Array();
    var L = new Array();
    var O = new Array();
    var uniqueUTM = [];
    // Uklanjanje prethodnih div elemenata iz containera
    let output = "";
    let productsContainer = "";

    //* filtriras samo podatke koji sadrze vrstu/takson koji si selektovao
    const species = select.value !== "" ? select.value : input.value;
    selectedSpeciesData = mapData.filter((item) =>
      item.vrsta.includes(species) ? item : undefined
    );
    // console.log(species);
    // console.log(selectedSpeciesData.length);

    //* pravis array sa svim utm i svim tipovima podataka za to sto si selektovao
    for (let i = 0; i < selectedSpeciesData.length; i++) {
      UTMOdabraneVrste.push(selectedSpeciesData[i].utm10x10);
      TipPodatkaOdabraneVrste.push(selectedSpeciesData[i].podatak);
    //   console.log(TipPodatkaOdabraneVrste);
    //   console.log(UTMOdabraneVrste);
    
    //* pronalazis sve jedinstvene UTM-ove u kojima se tvoja izabrana vrsta pronalazi
      var uniqueUtmData = selectedSpeciesData[i].utm10x10;
      if (!uniqueUTM.includes(uniqueUtmData)) {
        uniqueUTM.push(uniqueUtmData);
      }

    //* gleda se koja kombinacija tipova podataka je prisutna u svakom utm  
      T[i] = selectedSpeciesData.filter(
        (utm) =>
          utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
          utm.podatak.includes("Terenski")
      );

      L[i] = selectedSpeciesData.filter(
        (utm) =>
          utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
          utm.podatak.includes("Literaturni")
      );

      O[i] = selectedSpeciesData.filter(
        (utm) =>
          utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
          utm.podatak.includes("Usmeni")
      );

      T[i].length > 0 && L[i].length > 0 && O[i].length > 0
        ? (tipPodatakaPoUTM[i] = "TiLiO")
        : T[i].length > 0 && L[i].length > 0
        ? (tipPodatakaPoUTM[i] = "TiL")
        : T[i].length > 0 && O[i].length > 0
        ? (tipPodatakaPoUTM[i] = "TiO")
        : L[i].length > 0 && O[i].length > 0
        ? (tipPodatakaPoUTM[i] = "LiO")
        : T[i].length > 0
        ? (tipPodatakaPoUTM[i] = "T")
        : L[i].length > 0
        ? (tipPodatakaPoUTM[i] = "L")
        : O[i].length >= 0
        ? (tipPodatakaPoUTM[i] = "O")
        : console.log("nema bato nista");
      // console.log(tipPodatakaPoUTM[i]);

      let btnSelectedTaxon = document.querySelector(".togetherTaxa");
      btnSelectedTaxon.addEventListener("click", function () {
        UTMOdabraneVrste.forEach(function (proba101, i){
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

        document.getElementById(`product${i}`).className = tipPodatakaPoUTM[i];
      });
    });

      output += `<div class="product" id="product${i}"></div>`;
      document.querySelector(".products").innerHTML = output;
    }

    console.log(`You have ${UTMOdabraneVrste.length} data for ${species} taxon and it is found inside ${uniqueUTM.length} UTM 10x10 squares`);
    console.log(`Title: "Unique UTM Values`);
    console.table(uniqueUTM);
  }

  // Event listeners for select and input elements
  const select = document.querySelector("#selected");
  const input = document.getElementById("selectTaxon");
  select.addEventListener("change", () => {
    input.disabled = select.value !== "";
    loadData();
  });
  input.addEventListener("input", loadData);
});

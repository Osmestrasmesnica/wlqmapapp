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

importedData.then(() => {
    const mapData = filterAndMapData(WlqData);
    const select = document.querySelector("#selected");
    const input = document.getElementById("selectTaxon");

    const species = select.value !== "" ? select.value : input.value;
    selectedSpeciesData = mapData.filter((item) =>
      item.vrsta.includes(species) ? item : undefined
    );  
    
    const uniqueUTM = [...new Set(selectedSpeciesData.map((item) => item.utm10x10))];
    tipPodatakaPoUTM = {};

    for (const utm of uniqueUTM) {
      const types = selectedSpeciesData
        .filter((item) => item.utm10x10 === utm)
        .map((item) => item.podatak);

      if (
        types.includes('Terenski') &&
        types.includes('Literaturni') &&
        types.includes('Usmeni')
      ) {
        tipPodatakaPoUTM[utm] = 'TiLiO';
      } else if (
        types.includes('Terenski') &&
        types.includes('Literaturni')
      ) {
        tipPodatakaPoUTM[utm] = 'TiL';
      } else if (
        types.includes('Terenski') &&
        types.includes('Usmeni')
      ) {
        tipPodatakaPoUTM[utm] = 'TiO';
      } else if (
        types.includes('Literaturni') &&
        types.includes('Usmeni')
      ) {
        tipPodatakaPoUTM[utm] = 'LiO';
      } else if (types.includes('Terenski')) {
        tipPodatakaPoUTM[utm] = 'T';
      } else if (types.includes('Literaturni')) {
        tipPodatakaPoUTM[utm] = 'L';
      } else if (types.includes('Usmeni')) {
        tipPodatakaPoUTM[utm] = 'O';
      }
    }

    const togetherTaxa = () => {
      for (const utm of uniqueUTM) {
        let prvoSlovo1 = utm.substring(0, 1);
        let drugoSlovo1 = utm.substring(1, 2);
        let prviBroj1 = utm.substring(2, 3);
        let drugiBroj1 = utm.substring(3, 4);

        if (utm === '') {
          alert(
            'Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!'
          );
        } else if (prvoSlovo1.includes('C')) {
          document.getElementById(`product${utm}`).style.left = `calc(calc(0${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`;
        } else if (prvoSlovo1.includes('D')) {
          document.getElementById(`product${utm}`).style.left = `calc(calc(1${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`;
        } else if (prvoSlovo1.includes('E')) {
          document.getElementById(`product${utm}`).style.left = `calc(calc(2${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`;
        } else if (prvoSlovo1.includes('F')) {
          document.getElementById(`product${utm}`).style.left = `calc(calc(3${prviBroj1} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`;
        } else {
          console.log('nista od navedenog');
        }

        if (drugoSlovo1.includes('M')) {
          document.getElementById(`product${utm}`).style.top = `calc(calc(0${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`;
        } else if (drugoSlovo1.includes('N')) {
          document.getElementById(`product${utm}`).style.top = `calc(calc(1${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`;
        } else if (drugoSlovo1.includes('P')) {
          document.getElementById(`product${utm}`).style.top = `calc(calc(2${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`;
        } else if (drugoSlovo1.includes('Q')) {
          document.getElementById(`product${utm}`).style.top = `calc(calc(3${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`;
        } else if (drugoSlovo1.includes('R')) {
          document.getElementById(`product${utm}`).style.top = `calc(calc(4${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`;
        } else if (drugoSlovo1.includes('S')) {
          document.getElementById(`product${utm}`).style.top = `calc(calc(5${drugiBroj1} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`;
        } else {
          console.log('nista od navedenog nema');
        }

    // Set className based on tipPodatakaPoUTM value
    const productElement = document.getElementById(`product${utm}`);
    productElement.className = tipPodatakaPoUTM[utm];
      }
    };

    const output = uniqueUTM
      .map((utm) => `<div class="product" id="product${utm}"></div>`)
      .join('');

    document.querySelector('.products').innerHTML = output;

    // Call togetherTaxa function when .togetherTaxa button is clicked
    document
      .querySelector('.togetherTaxa')
      .addEventListener('click', togetherTaxa);
  });
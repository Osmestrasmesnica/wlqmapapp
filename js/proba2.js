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

const filterAndMapData = (data) => {
    const filtered = data.filter(
        (podatak) => podatak.UTM_10x10 && podatak.UTM_10x10 !== "Neprecizan podatak"
    );

    return filtered.map((i) => ({
        vrsta: i.PunNazivTaksona,
        utm10x10: i.UTM_10x10,
        podatak: i.Tip_podatka,
    }));
};

let selectedSpeciesData;
let qwerty;
let UTMOdabraneVrste
let output1 = "";
importedData.then(() => {
    const mapData = filterAndMapData(WlqData);

    const uniqueValues = [...new Set(mapData.map((i) => i.vrsta))];
    console.log("Unique values:", uniqueValues);

    function loadData() {
        UTMOdabraneVrste = [];
        let TipPodatkaOdabraneVrste = [];
        var T = new Array();
        var L = new Array();
        var H = new Array();
        qwerty = [];
        let consoleOutput;

        const species = select.value !== "" ? select.value : input.value;
        selectedSpeciesData = mapData.filter((item) =>
            item.vrsta.includes(species) ? item : undefined
        );
        // console.log(species);
        console.log(selectedSpeciesData.length);
        for (let i = 0; i < selectedSpeciesData.length; i++) {
            UTMOdabraneVrste.push(selectedSpeciesData[i].utm10x10);
            TipPodatkaOdabraneVrste.push(selectedSpeciesData[i].podatak);
            console.log(TipPodatkaOdabraneVrste);
            console.log(UTMOdabraneVrste);
            const proba10 = UTMOdabraneVrste[i];
            let btnSelectedTaxon = document.querySelector('.togetherTaxa');

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

            //todo prepraviti ovde iz USMENI u HERBARSKI
            H[i] = selectedSpeciesData.filter(
                (utm) =>
                    utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) &&
                    utm.podatak.includes("Usmeni")
            );

            T[i].length > 0 && L[i].length > 0 && H[i].length > 0
                ? (qwerty[i] = "TiLiH")
                : T[i].length > 0 && L[i].length > 0
                    ? (qwerty[i] = "TiL")
                    : T[i].length > 0 && H[i].length > 0
                        ? (qwerty[i] = "TiH")
                        : L[i].length > 0 && H[i].length > 0
                            ? (qwerty[i] = "LiH")
                            : T[i].length > 0
                                ? (qwerty[i] = "T")
                                : L[i].length > 0
                                    ? (qwerty[i] = "L")
                                    : T[i].length > 0
                                        ? (qwerty[i] = "H")
                                        : console.log("nema bato nista");
            // console.log(qwerty[i]);


            btnSelectedTaxon.addEventListener('click', function () {
                const proba101 = UTMOdabraneVrste[i]
                let prvoSlovo1 = proba101.substring(0, 1);
                let drugoSlovo1 = proba101.substring(1, 2);
                let prviBroj1 = proba101.substring(2, 3);
                let drugiBroj1 = proba101.substring(3, 4);

                //*za prvo slovo
                proba101 === '' ? alert('Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!')
                    : prvoSlovo1.includes('C') ? document.getElementById(`product${i}`).style.left = `calc(calc(0${prviBroj1} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
                        : prvoSlovo1.includes('D') ? document.getElementById(`product${i}`).style.left = `calc(calc(1${prviBroj1} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
                            : prvoSlovo1.includes('E') ? document.getElementById(`product${i}`).style.left = `calc(calc(2${prviBroj1} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
                                : prvoSlovo1.includes('F') ? document.getElementById(`product${i}`).style.left = `calc(calc(3${prviBroj1} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
                                    : console.log('nista od navedenog');

                //*za drugo slovo                                                             
                drugoSlovo1.includes('M') ? document.getElementById(`product${i}`).style.top = `calc(calc(0${drugiBroj1} * -1.918%) + calc(100% - 37.8%) + calc(-20 * -1.918%))`
                    : drugoSlovo1.includes('N') ? document.getElementById(`product${i}`).style.top = `calc(calc(1${drugiBroj1} * -1.918%) + calc(100% - 37.8%) + calc(-20 * -1.918%))`
                        : drugoSlovo1.includes('P') ? document.getElementById(`product${i}`).style.top = `calc(calc(2${drugiBroj1} * -1.918%) + calc(100% - 37.8%) + calc(-20 * -1.918%))`
                            : drugoSlovo1.includes('Q') ? document.getElementById(`product${i}`).style.top = `calc(calc(3${drugiBroj1} * -1.918%) + calc(100% - 37.8%) + calc(-20 * -1.918%))`
                                : drugoSlovo1.includes('R') ? document.getElementById(`product${i}`).style.top = `calc(calc(4${drugiBroj1} * -1.918%) + calc(100% - 37.8%) + calc(-20 * -1.918%))`
                                    : drugoSlovo1.includes('S') ? document.getElementById(`product${i}`).style.top = `calc(calc(5${drugiBroj1} * -1.918%) + calc(100% - 37.8%) + calc(-20 * -1.918%))`
                                        : console.log('nista od navedenog nema');

                document.getElementById(`product${i}`).className = qwerty[i]
            })


            output1 += `<div class="product" id="product${i}"></div>`
            document.querySelector(".products").innerHTML = output1;
        }

        const countQwerty = (qwerty) => {
            const count = {};
            for (const item of qwerty) {
                count[item] = count[item] ? count[item] + 1 : 1;
            }
            return count;
        };

        const qwertyCount = countQwerty(qwerty);

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

        // console.log(consoleOutput);
        // console.table(UTMOdabraneVrste);
        // console.log(selectedSpeciesData.length);
    }

    const select = document.querySelector("#selected");
    const input = document.getElementById("selectTaxon");
    select.addEventListener("change", () => {
        input.disabled = select.value !== "";
        loadData();
    });
    input.addEventListener("input", loadData);








});

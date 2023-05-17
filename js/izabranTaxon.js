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

importedData.then(() => {
    const mapData = filterAndMapData(WlqData);

    const uniqueValues = [...new Set(mapData.map((i) => i.vrsta))];
    console.log("Unique values:", uniqueValues);

    function loadData() {
        const selectedSpecies = [];
        const selectedDataTypes = [];
        const fieldData = [];
        const literatureData = [];
        const oralData = [];
        const dataTypes = [];
        let UTMOdabraneVrste = [];
        let TipPodatkaOdabraneVrste = [];
        var T = new Array();
        var L = new Array();
        var H = new Array();
        var qwerty = [];
        let output1 = "";
        let consoleOutput;

        const species = select.value !== "" ? select.value : input.value;
        const selectedSpeciesData = mapData.filter((item) =>
            item.vrsta.includes(species) ? item : undefined
        );
        console.log(species);
        console.log(selectedSpeciesData.length);
        for (let i = 0; i < selectedSpeciesData.length; i++) {
            UTMOdabraneVrste.push(selectedSpeciesData[i].utm10x10);
            TipPodatkaOdabraneVrste.push(selectedSpeciesData[i].podatak);
            const proba10 = UTMOdabraneVrste[i];

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
            console.log(qwerty[i]);
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
        console.log(consoleOutput);
    }

    const select = document.querySelector("#selected");
    const input = document.getElementById("selectTaxon");
    select.addEventListener("change", () => {
        input.disabled = select.value !== "";
        loadData();
    });
    input.addEventListener("input", loadData);
});

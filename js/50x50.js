import * as d3 from 'https://unpkg.com/d3?module'

const baza = new Promise((resolve) => {
    if (WlqData) {
        resolve();
    } else {
        const intervalId = setInterval(() => {
            if (WlqData) {
                clearInterval(intervalId);
                resolve();
            }
        }, 50);
    }
});

baza.then(() => {
    // Info Odavde počinje kod
    console.log("Svi uneti podaci:", WlqData);

    let kvadrat50x50;

    //! Samo oni podaci za koje postoji već UTM10x10 odrađen, ovde vidiš šta sve sadrže
    const podaciUTM = WlqData.filter(
        (podatak) =>
        podatak.UTM_10x10 !== undefined &&
        podatak.UTM_10x10 !== "Neprecizan podatak"
    );

    //! Samo podaci koji nas interesuju u novom arrayu, u susti je isto sto i podaciUTM samo sto nema sve od podataka unutra
    var lepPrikaz = podaciUTM.map((i) => {
        return {
            vrsta: i.PunNazivTaksona,
            utm10x10: i.UTM_10x10,
            utm50x50: i.UTM_50x50,
            utm100x100: i.UTM_100x10,
            podatak: i.Tip_podatka,
            // Note: ovde moze da se stavi sta god zelimo jos da prikazemo ili racunamo */
        };
    });
    console.log("Ovde su filtrirani podaci za koje postoji vrednost u koloni UTM_10x10 i prikazane su u ovom slučaju samo kolone za takson, utm i tip podatka:", lepPrikaz);

    //! Spisak svih kvadrata sa duplikatima
    const UTM50x50 = podaciUTM.map((kvadrat) => kvadrat.UTM_50x50);
    // print console.log(UTM50x50);
    // print console.table(UTM50x50);

    //! Koliko imam podataka po svakom 50x50 kvadratu ima
    const kolikoKvadrata = UTM50x50.reduce(function (obj, item) {
        if (!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    }, {});
    console.log("Koliko imam podataka po svakom 50x50 kvadratu ima:");
    console.table(kolikoKvadrata);

    //! Broj 50x50 kvadrata
    let Jedinstveni50x50;
    Jedinstveni50x50 = Object.keys(kolikoKvadrata).length
    console.log(`Ukupno je zabeleženo ${Jedinstveni50x50} kvadrata 50x50`);

    //! Broj jedinstvenih taksona po svakom jedinstvenom UTM 50x50 kvadratu
    const kolikoCegaUTM50x50 = podaciUTM.reduce((acc, podatak) => {
        const { UTM_50x50, PunNazivTaksona } = podatak;

        if (!acc[UTM_50x50]) {
            acc[UTM_50x50] = {};
        }

        if (!acc[UTM_50x50][PunNazivTaksona]) {
            acc[UTM_50x50][PunNazivTaksona] = 0;
        }

        acc[UTM_50x50][PunNazivTaksona]++;
        return acc;
    }, {});
    // Konvertuj objekat sa brojem pojavljivanja u oblik lepog prikaza
    const brojRazlicitihTaksonaPoUTM50x50 = Object.entries(kolikoCegaUTM50x50).map(([utm50x50, taksoni]) => {
        const brojRazlicitihTaksona = Object.keys(taksoni).length;
        return {
            UTM_50x50: utm50x50,
            Broj_Razlicitih_Taksona: brojRazlicitihTaksona,
        };
    });
    // Sortiranje rezultata po opadajućem nizu
    const sortiranoBrojRazlicitihTaksona = brojRazlicitihTaksonaPoUTM50x50.sort((a, b) => b.Broj_Razlicitih_Taksona - a.Broj_Razlicitih_Taksona);
    console.table("Sortirano po broju različitih taksona u UTM 50x50 kvadratima(opadajući niz)");
    console.table(sortiranoBrojRazlicitihTaksona);

    // //! Funkcija koja generiše skalu boja na osnovu vrednosti
    // function generisiSkaluBoja(vrednosti) {
    //     const bojaSkala = d3.scaleSequential(d3.interpolateGreens).domain([0, Math.max(...vrednosti)]); //interpolateGreens, interpolateTurbo, interpolateCool   
    //     return (vrednost) => bojaSkala(vrednost);
    // }

    //! Funkcija koja generiše skalu boja na osnovu vrednosti
    function generisiSkaluBoja(vrednosti) {
        const bojaSkala = d3.scaleSequential((t) => {
            // Define custom color interpolation
            if (t <= 0.2) {
                // For t <= 0.2, interpolate from white to a light green
                return d3.interpolateRgb("white", "#7FFF00")(t * 5); // Light green color
            } else {
                // For t > 0.2, interpolate from a light green to dark green
                return d3.interpolateRgb("#7FFF00", "#006400")(t * 2.5); // Dark green color
            }
        }).domain([0, Math.max(...vrednosti)]); // Set the domain

        return (vrednost) => bojaSkala(vrednost);
    }

    // Dobijanje vrednosti koje će se koristiti za generisanje skale boja
    const vrednostiZaSkalu = sortiranoBrojRazlicitihTaksona.map((item) => item.Broj_Razlicitih_Taksona);

    // Generisanje skale boja
    const skalaBoja = generisiSkaluBoja(vrednostiZaSkalu);
    
    // Dodavanje boje u rezultate
    const rezultatiSaBojom = sortiranoBrojRazlicitihTaksona.map((item) => ({
        ...item,
        Boja: skalaBoja(item.Broj_Razlicitih_Taksona),
    }));
    console.table("Rezultati sa skalom boja");
    console.table(rezultatiSaBojom);

    //! Funkcija za veličinu krugova
    const maxBrojTaksona = Math.max(...vrednostiZaSkalu);
    const minBrojTaksona = Math.min(...vrednostiZaSkalu);

    function postaviStilZaDiv(div, kvadrat) {
        const { Broj_Razlicitih_Taksona } = kvadrat;
        const scaleFactor = 5; // Faktor skaliranja za najveću vrednost
        const minSize = 2.5; // Minimalna veličina za najmanju vrednost

        const newSize = minSize + (scaleFactor - minSize) * (Broj_Razlicitih_Taksona - minBrojTaksona) / (maxBrojTaksona - minBrojTaksona);
        div.style.width = `${newSize}em`;
        div.style.height = `${newSize}em`;
    }

    //! Funkcija koja postavlja stil za prvo slovo
    function postaviStilZaPrvoSlovo(prvoSlovo, vrednostZaPrviBrojLeft, i) {
        const id = `product${i}`;
        let element = document.getElementById(id);

        if (!element) {
            // Create the element if it doesn't exist
            element = document.createElement("div");
            element.id = id;
            element.classList.add("product");
            document.querySelector(".products").appendChild(element);
        }

        // Add the data-utm attribute
        element.setAttribute("data-utm", kvadrat50x50.UTM_50x50);

        if (kvadrat50x50.UTM_50x50 === "") {
            alert("Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!");
        } else {
            switch (prvoSlovo) {
                case "C":
                    element.style.left = `calc(calc(0${vrednostZaPrviBrojLeft} * 2.4333%) + calc(62.6%) + calc(-20 * 2.43%))`;
                    break;
                case "D":
                    element.style.left = `calc(calc(1${vrednostZaPrviBrojLeft} * 2.4333%) + calc(62.6%) + calc(-20 * 2.43%))`;
                    break;
                case "E":
                    element.style.left = `calc(calc(2${vrednostZaPrviBrojLeft} * 2.4333%) + calc(62.6%) + calc(-20 * 2.43%))`;
                    break;
                case "F":
                    element.style.left = `calc(calc(3${vrednostZaPrviBrojLeft} * 2.4333%) + calc(62.6%) + calc(-20 * 2.43%))`;
                    break;
                default:
                    console.log("nista od navedenog");
            }
        }
    }

    //! Funkcija koja postavlja stil za drugo slovo
    function postaviStilZaDrugoSlovo(drugoSlovo, vrednostZaPrviBrojTop, i) {
        const id = `product${i}`;
        let element = document.getElementById(id);

        if (!element) {
            // Create the element if it doesn't exist
            element = document.createElement("div");
            element.id = id;
            element.classList.add("product");
            document.querySelector(".products").appendChild(element);
        }

        switch (drugoSlovo) {
            case "M":
                element.style.top = `calc(calc(0${vrednostZaPrviBrojTop} * -1.9167%) + calc(77.5%) + calc(10 * 1.9167%))`;
                break;
            case "N":
                element.style.top = `calc(calc(1${vrednostZaPrviBrojTop} * -1.9167%) + calc(77.5%) + calc(10 * 1.9167%))`;
                break;
            case "P":
                element.style.top = `calc(calc(2${vrednostZaPrviBrojTop} * -1.9167%) + calc(77.5%) + calc(10 * 1.9167%))`;
                break;
            case "Q":
                element.style.top = `calc(calc(3${vrednostZaPrviBrojTop} * -1.9167%) + calc(77.5%) + calc(10 * 1.9167%))`;
                break;
            case "R":
                element.style.top = `calc(calc(4${vrednostZaPrviBrojTop} * -1.9167%) + calc(77.5%) + calc(10 * 1.9167%))`;
                break;
            case "S":
                element.style.top = `calc(calc(5${vrednostZaPrviBrojTop} * -1.9167%) + calc(77.5%) + calc(10 * 1.9167%))`;
                break;
            default:
                console.log("nista od navedenog nema");
        }
    }

    //! Event handler za pritiskanje dugmeta sa id btn50x50
    const dugme = document.querySelector("#btn50x50");
    dugme.addEventListener("click", (event) => {
        // Clear the existing content of the products div
        document.querySelector(".products").innerHTML = '';

        for (let i = 0; i < rezultatiSaBojom.length; i++) {
            kvadrat50x50 = rezultatiSaBojom[i];
            const prvoSlovo = kvadrat50x50.UTM_50x50.substring(0, 1);
            const drugoSlovo = kvadrat50x50.UTM_50x50.substring(1, 2);
            const prviBroj = kvadrat50x50.UTM_50x50.substring(2, 3);

            let vrednostZaPrviBrojTop;
            let vrednostZaPrviBrojLeft;

            if (prviBroj.includes("2") || prviBroj.includes("4")) {
                vrednostZaPrviBrojTop = 0;
            } else if (prviBroj.includes("1") || prviBroj.includes("3")) {
                vrednostZaPrviBrojTop = 5;
            }

            if (prviBroj.includes("2") || prviBroj.includes("1")) {
                vrednostZaPrviBrojLeft = 0;
            } else if (prviBroj.includes("4") || prviBroj.includes("3")) {
                vrednostZaPrviBrojLeft = 5;
            }
            postaviStilZaPrvoSlovo(prvoSlovo, vrednostZaPrviBrojLeft, i);
            postaviStilZaDrugoSlovo(drugoSlovo, vrednostZaPrviBrojTop, i);

            // Nakon što ste definisali sve vaše podatke i boje, možete pristupiti divovima
            // koji imaju atribut data-utm jednak UTM50x50 i postaviti im background-color
            rezultatiSaBojom.forEach((kvadrat) => {
                const dataUtm = kvadrat.UTM_50x50;
                const boja = kvadrat.Boja;
        
                // Pronalazimo sve divove sa atributom data-utm jednakim trenutnom UTM50x50
                const divoviSaUtm = document.querySelectorAll(`[data-utm="${dataUtm}"]`);
        
                // Postavljamo background-color za svaki div
                divoviSaUtm.forEach((div) => {
                    postaviStilZaDiv(div, kvadrat);
                    div.style.backgroundColor = boja;
                });
            });
        }
    });
})

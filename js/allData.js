const waitForWlqData = new Promise((resolve) => {
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

waitForWlqData.then(() => {
  console.log("Svi uneti podaci:", WlqData);
  //TODO promeniti zaglavlje kolone ako nije ustanovljen uniformni naziv (ovde je UTM_10x10)
  //!Konstanta koja sadrži podatke sa svim vrstama za koje postoje UTM10x10 kvadratići, pritom moraju da su lepo nazvani tj da sadrži 4 karatkera (potencialno napraviti da su prve 2 slova, druge 2 broj), da nisu prazne/0, da ne piše "Neprecizan podatak"
  //!Kolona gde su UTM kvadratići se ovde zove UTM_10x10 i bilo bi lepo da se uniformiše kako će se ova kolona zvati u EXCELU
  
  //*Samo oni podaci za koje postoji već UTM odrađen, ovde vidiš šta sve sadrže
  const podaciUTM = WlqData.filter(
    (podatak) =>
      podatak.UTM_10x10 !== undefined &&
      podatak.UTM_10x10 !== "Neprecizan podatak" /*&& podatak.Tip_podatka == "Terenski"*/
  );
  //console.log(podaciUTM);
  //console.table(podaciUTM);

  //*Samo podaci koji nas interesuju u novom arrayu, u susti je isto sto i podaciUTM samo sto nema sve od podataka unutra
  //TODO vidi da li ovo moze da se napise i bez return i ljubicaste {} i plave {} - mora :)
  //TODO obratiti pažnju koje sve kolone sadrži (primer je i.Redni_broj, i.Pun_naziv), proveriti iz originalne Excel tabele i eventualno dodaješ po potrebi šta želiš ovde
  var lepPrikaz = podaciUTM.map((i) => {
    return {
      vrsta: i.PunNazivTaksona,
      utm10x10: i.UTM_10x10,
      podatak: i.Tip_podatka,
      // ovde moze da se stavi stagod zelimo jos da prikazemo ili racunamo */
    };
  });
  console.log("Ovde su filtrirani podaci za koje postoji vrednost u koloni UTM_10x10 i prikazane su u ovom slučaju samo kolone za takson, utm i tip podatka:", lepPrikaz);

  //*Spisak svih vrsta
  const vrsteUTM = podaciUTM.map((vrste) => vrste.PunNazivTaksona);
  //console.log(vrsteUTM);
  //console.table(vrsteUTM);

  //*Koliko koje vrste i spisak svih
  const kolikoKojeVrste = vrsteUTM.reduce(function (obj, item) {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item]++;
    return obj;
  }, {}); //ne smeš da zaboraviš prazan skup da ubaciš ovde ,{});
  console.log("Koliko koje vrste ima:");
  console.table(kolikoKojeVrste);

  //*Broj vrsta
  console.log(`Ukupno je zabeleženo ${Object.keys(kolikoKojeVrste).length} taksona`);

  //*Vrednosti svih 10x10 kvadratica
  const podaciUTM10 = podaciUTM.map((podatak) => podatak.UTM_10x10);
  // console.log(podaciUTM10);
  
  //*Koliko kog UTM10x10 imas

  const kolikoCega = podaciUTM10.reduce(function (obj, item) {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item]++;
    return obj;
  }, {}); //ne zaboraviti da treba i prazan array na kraju da se doda {}
  console.table("Koliko podataka ima po UTM 10x10 kvadratu");
  //! DORADI OVAJ DEO DA PRIKAZUJE KOLIKO POJEDINACNIH TAKSONA ORHIDEJA IMA PO SVAKOM UTM 10X10 I 50X50
  console.table(kolikoCega);

  //*Oni kvadracitici koji se ne ponavljaju 10x10
  var kockice = Array.from(new Set(podaciUTM10));
  console.log(`Ukupan broj UTM kvadrata u kojima je zabeleženo prisustvo orhideja: ${kockice.length} UTM 10x10 kvadrata.`);
  //*Provera koliko u ukupno padataka imaš za T/L/O/Usmeni
  console.log("Koliko usmenih podataka ima i koji su:", lepPrikaz.filter((utm) => utm.podatak.includes(`Usm`)));

  //*Prazne varijable za svaki tip podatka
  var T = new Array();
  var L = new Array();
  var O = new Array();
  var tipReference = [];
  let output = "";

  //*Za svaki 10x10 kvadratic se pravi div
  for (let i = 0; i < kockice.length; i++) {
    const utmPodatak = kockice[i];

    //*pronalazi svaki utm kome je tip podatka Terenski
    T[i] = lepPrikaz.filter(
      (utm) =>
        utm.utm10x10.includes(`${kockice[i]}`) &&
        utm.podatak.includes("Terenski")
    );

    //*pronalazi svaki utm kome je tip podatka Literaturni
    L[i] = lepPrikaz.filter(
      (utm) =>
        utm.utm10x10.includes(`${kockice[i]}`) &&
        utm.podatak.includes("Literaturni")
    );

    //*pronalazi svaki utm kome je tip podatka Usmeni/Odnosno ovde treba da bude
    O[i] = lepPrikaz.filter(
      (utm) =>
        utm.utm10x10.includes(`${kockice[i]}`) && 
        utm.podatak.includes("Usmeni")
    );

    //*ako je duži od 0 onda znači da za taj UTM postoji taj tip podatka i time određuješ koji sve tipovi podatka postoje za svaki pojedinačni utm
    T[i].length > 0 && L[i].length > 0 && O[i].length > 0
      ? (tipReference[i] = "TiLiO")
      : T[i].length > 0 && L[i].length > 0
      ? (tipReference[i] = "TiL")
      : T[i].length > 0 && O[i].length > 0
      ? (tipReference[i] = "TiO")
      : L[i].length > 0 && O[i].length > 0
      ? (tipReference[i] = "LiO")
      : T[i].length > 0
      ? (tipReference[i] = "T")
      : L[i].length > 0
      ? (tipReference[i] = "L")
      : O[i].length >= 0
      ? (tipReference[i] = "O")
      : console.log("nema bato nista");

    //*dugme kada pritisneš prepozna koji UTM treba da ubaci i kako menja tipReference u T/L/H/TiL/TiH/LiH/TiLiH
    let dugme = document.querySelector("#btnAllData");
    dugme.addEventListener("click", (event) => {
      console.log("ALEKSA E JESI MI KRALJ");
      let prvoSlovo = utmPodatak.substring(0, 1);
      let drugoSlovo = utmPodatak.substring(1, 2);
      let prviBroj = utmPodatak.substring(2, 3);
      let drugiBroj = utmPodatak.substring(3, 4);
      //console.log(prvoSlovo, drugoSlovo, prviBroj, drugiBroj);

      //*za prvo slovo
      utmPodatak === ""
        ? alert("Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!")
        : prvoSlovo.includes("C")
        ? (document.getElementById(
            `product${i}`
          ).style.left = `calc(calc(0${prviBroj} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
        : prvoSlovo.includes("D")
        ? (document.getElementById(
            `product${i}`
          ).style.left = `calc(calc(1${prviBroj} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
        : prvoSlovo.includes("E")
        ? (document.getElementById(
            `product${i}`
          ).style.left = `calc(calc(2${prviBroj} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
        : prvoSlovo.includes("F")
        ? (document.getElementById(
            `product${i}`
          ).style.left = `calc(calc(3${prviBroj} * 2.4333%) + calc(57.9%) + calc(-20 * 2.43%))`)
        : console.log("nista od navedenog");

      //*za drugo slovo
      drugoSlovo.includes("M")
        ? (document.getElementById(
            `product${i}`
          ).style.top = `calc(calc(0${drugiBroj} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
        : drugoSlovo.includes("N")
        ? (document.getElementById(
            `product${i}`
          ).style.top = `calc(calc(1${drugiBroj} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
        : drugoSlovo.includes("P")
        ? (document.getElementById(
            `product${i}`
          ).style.top = `calc(calc(2${drugiBroj} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
        : drugoSlovo.includes("Q")
        ? (document.getElementById(
            `product${i}`
          ).style.top = `calc(calc(3${drugiBroj} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
        : drugoSlovo.includes("R")
        ? (document.getElementById(
            `product${i}`
          ).style.top = `calc(calc(4${drugiBroj} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
        : drugoSlovo.includes("S")
        ? (document.getElementById(
            `product${i}`
          ).style.top = `calc(calc(5${drugiBroj} * -1.9167%) + calc(81.3%) + calc(10 * 1.9167%))`)
        : console.log("nista od navedenog nema");

      //*menjaš class name da ti na krati budu različito prikazani utm koji imaju više tipova podataka TiL/LiH/TiLiH/T/L/H/
      //!dodati za netacan/sumnjiv/zvezda(nov)/neprecizan
      //!napraviti u css za neprecizan
      document.getElementById(`product${i}`).className = tipReference[i];
    });

    //*Za svaki 10x10 [i] praviš div i ubacujes u .products deo
    //!ovo ne bi trebalo da ti ide unutar dugmeta
    output += `<div class="product" id="product${i}"></div>`;
    document.querySelector(".products").innerHTML = output;
  }
  //todo napraviti da mozes da biras koja vrsta je koje boje
  //todo napraviti da velicina kruzica u kvadraticima zavisi od ukupnog broja podataka u datom kvadraticu
  //todo PROMENITI SLIKU POZADINE I NAPRAVITI UTM grid za nju i odrediti poziciju slike (top: nn px; left: nn px)
});
const waitForWlqData = new Promise(resolve => {
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
    // your code here
 

        const filtered = WlqData.filter(podatak => (
        podatak.UTM_10x10 !== undefined && 
        podatak.UTM_10x10 !== "Neprecizan podatak"  
        /*&& podatak.Tip_podatka == "Terenski"*/
        ));

        // Function to map data to a new object structure
        const mapData = filtered.map(i => ({
            vrsta: i.PunNazivTaksonaTaksona,
            utm10x10: i.UTM_10x10,
            podatak: i.Tip_podatka
        })); 

        // Function to get unique values from an array
        const getUniqueValues = mapData => Array.from(new Set(mapData));
        const vrsteMapUTM = filtered.map(vrste => vrste.PunNazivTaksonaTaksona)
        console.log(getUniqueValues);
        console.log(vrsteMapUTM);
        
        // Function to handle select change event
        const handleSelectChange = event => {
            input.disabled = select.value !== "";
        };     

        const select = document.querySelector("#selected");
        const input = document.getElementById("#selectTaxon");
        select.addEventListener("change", event => {
        input.disabled = select.value !== "";
        });




        let btnSelectedTaxon = document.querySelector('.togetherTaxa');
        btnSelectedTaxon.addEventListener('click', event => {
            const value = select.value !== "" ? select.value : input.value;

            let arrOdabraneVrste = mapData.filter(function(item){
                if (item.vrsta.includes(value)){
                return{}
                };
            }); 
    
            let UTMOdabraneVrste = [];
            let TipPodatkaOdabraneVrste = [];
            var T = new Array();
            var L = new Array();
            var H = new Array();
            var qwerty = [];
            let output = "";

            for(let i=0; i<arrOdabraneVrste.length; i++){
                UTMOdabraneVrste.push(arrOdabraneVrste[i].utm10x10);
                TipPodatkaOdabraneVrste.push(arrOdabraneVrste[i].podatak);
                const proba10 = UTMOdabraneVrste[i];

                T[i] = arrOdabraneVrste
                    .filter(utm => utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) 
                    && utm.podatak.includes("Terenski"))
                    
                L[i] = arrOdabraneVrste
                    .filter(utm => utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) 
                    && utm.podatak.includes("Literaturni"))

                //todo prepraviti ovde iz USMENI u HERBARSKI
                 H[i] = arrOdabraneVrste
                    .filter(utm => utm.utm10x10.includes(`${UTMOdabraneVrste[i]}`) 
                    && utm.podatak.includes("Usmeni"))
    
                //!ako se nesto nalazi pod Terenski/Usmeni/Herbarski/Literaturni podatak onda će dužina biti veća od 0
                T[i].length > 0 && L[i].length > 0 && H[i].length > 0 ? qwerty[i] = ("TiLiH") 
                : T[i].length > 0 && L[i].length > 0 ? qwerty[i] = ("TiL") 
                : T[i].length > 0 && H[i].length > 0 ? qwerty[i] = ("TiH") 
                : L[i].length > 0 && H[i].length > 0 ? qwerty[i] = ("LiH")
                : T[i].length > 0 ? qwerty[i] = ("T") 
                : L[i].length > 0 ? qwerty[i] = ("L")
                : T[i].length > 0 ? qwerty[i] = ("H")
                : console.log("nema bato nista");
                console.log(qwerty[i]);



                let prvoSlovo1 = proba10.substring(0,1);
                let drugoSlovo1 = proba10.substring(1,2);
                let prviBroj1 = proba10.substring(2,3);
                let drugiBroj1 = proba10.substring(3,4);
                //console.log(prvoSlovo1, drugoSlovo1, prviBroj1, drugiBroj1);
                
                //*za prvo slovo
                proba10 ==='' ? alert('Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!')
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

            }
            output += `<div class="product" id="product${i}"></div>`
            document.querySelector(".products").innerHTML = output;
        })

    });
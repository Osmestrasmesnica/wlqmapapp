/*
//podesavanje inputa
const myInput10x10 = document.querySelector('[name="add10x10"]')
let btn10x10 = document.querySelector('.btn10x10');
btn10x10.addEventListener('click', event => {
    let prvoSlovo10x10 = myInput10x10.value.substring(0,1);
    let drugoSlovo10x10 = myInput10x10.value.substring(1,2);
    let prviBroj10x10 = myInput10x10.value.substring(2,3);
    let drugiBroj10x10 = myInput10x10.value.substring(3,4);
    console.log(prvoSlovo10x10, drugoSlovo10x10, prviBroj10x10, drugiBroj10x10); 
  
    //za prvo slovo
    myInput10x10.value ==='' ? alert('Moraš da ubaciš ispravnu vrednost 10x10 UTM kvadrata!')
    : prvoSlovo10x10.includes('C') ? document.getElementById('coordinates').style.left = `calc(calc(0${prviBroj10x10} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
    : prvoSlovo10x10.includes('D') ? document.getElementById('coordinates').style.left = `calc(calc(1${prviBroj10x10} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
    : prvoSlovo10x10.includes('E') ? document.getElementById('coordinates').style.left = `calc(calc(2${prviBroj10x10} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
    : prvoSlovo10x10.includes('F') ? document.getElementById('coordinates').style.left = `calc(calc(3${prviBroj10x10} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`
    : console.log('nista od navedenog');
   
    //za drugo slovo
    drugoSlovo10x10.includes('M') ? document.getElementById('coordinates').style.top = `calc(calc(0${drugiBroj10x10} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`
    : drugoSlovo10x10.includes('N') ? document.getElementById('coordinates').style.top = `calc(calc(1${drugiBroj10x10} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`
    : drugoSlovo10x10.includes('P') ? document.getElementById('coordinates').style.top = `calc(calc(2${drugiBroj10x10} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`
    : drugoSlovo10x10.includes('Q') ? document.getElementById('coordinates').style.top = `calc(calc(3${drugiBroj10x10} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`
    : drugoSlovo10x10.includes('R') ? document.getElementById('coordinates').style.top = `calc(calc(4${drugiBroj10x10} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`
    : drugoSlovo10x10.includes('S') ? document.getElementById('coordinates').style.top = `calc(calc(5${drugiBroj10x10} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`
    : console.log('nista od navedenog nema');
});

//todo mogao bi napraviš da ti pravi <div></div> za svaki klik dugmetom 
//todo onda možeš da napraviš i da ti ukloni sve/poslednji div
//todo napravi da možeš i da biraš kakav će biti taj div isto (T/L/H)
*/

const myInput10x10 = document.querySelector('[name="add10x10"]');
let btn10x10 = document.querySelector('.btn10x10');
let coordinatesContainer = document.getElementById('coordinates-container');
let clickCount = 0;
let placeForDeleteBtn = document.querySelector('.grp_add10x10');

btn10x10.addEventListener('click', event => {
  clickCount++;

  if (clickCount === 2) {
    // Kreiraj dugme za brisanje
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-coordinates';
    deleteButton.textContent = 'Delete';

    // Dodaj event listener za brisanje
    deleteButton.addEventListener('click', () => {
      coordinatesContainer.innerHTML = '';
    });

    // Dodaj dugme za brisanje u 'coordinates-container'
    placeForDeleteBtn.appendChild(deleteButton);
  }

  let input10x10Value = myInput10x10.value;

  if (input10x10Value.length !== 4) {
    alert('Moraš da uneseš ispravnu kombinaciju 2 slova i 2 broja!');
    return;
  }

  let prvoSlovo10x10 = input10x10Value.substring(0, 1);
  let drugoSlovo10x10 = input10x10Value.substring(1, 2);
  let prviBroj10x10 = input10x10Value.substring(2, 3);
  let drugiBroj10x10 = input10x10Value.substring(3, 4);

  let newCoordinates = document.createElement('div');
  newCoordinates.className = 'coordinates';
  newCoordinates.style.left = calculateLeftPosition(prvoSlovo10x10, prviBroj10x10);
  newCoordinates.style.top = calculateTopPosition(drugoSlovo10x10, drugiBroj10x10);

  coordinatesContainer.appendChild(newCoordinates);
});

function calculateLeftPosition(prvoSlovo, prviBroj) {
  if (prvoSlovo === 'C') {
    return `calc(calc(0${prviBroj} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`;
  } else if (prvoSlovo === 'D') {
    return `calc(calc(1${prviBroj} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`;
  } else if (prvoSlovo === 'E') {
    return `calc(calc(2${prviBroj} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`;
  } else if (prvoSlovo === 'F') {
    return `calc(calc(3${prviBroj} * 2.440%) + calc(8.4% + 49.5%) + calc(-20 * 2.440%))`;
  } else {
    console.log('Nije uneto nijedno od navedenih slova.');
    return '';
  }
}

function calculateTopPosition(drugoSlovo, drugiBroj) {
  if (drugoSlovo === 'M') {
    return `calc(calc(0${drugiBroj} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`;
  } else if (drugoSlovo === 'N') {
    return `calc(calc(1${drugiBroj} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`;
  } else if (drugoSlovo === 'P') {
    return `calc(calc(2${drugiBroj} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`;
  } else if (drugoSlovo === 'Q') {
    return `calc(calc(3${drugiBroj} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`;
  } else if (drugoSlovo === 'R') {
    return `calc(calc(4${drugiBroj} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`;
  } else if (drugoSlovo === 'S') {
    return `calc(calc(5${drugiBroj} * -1.913%) + calc(100% - 37.8%) + calc(-20 * -1.909%))`;
  } else {
    console.log('Nije uneto nijedno od navedenih slova.');
    return '';
  }
}
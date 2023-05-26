//todo napravi da možeš i da biraš kakav će biti taj div isto (T/L/H)
const myInput10x10 = document.querySelector('[name="add10x10"]');
let btn10x10 = document.querySelector('.btn10x10');
let coordinatesContainer = document.getElementById('coordinates-container');
let clickCount = 0;
let placeForDeleteBtn = document.querySelector('.buttons-for-delete'); //!ovo mozes jos malo u CSS da sredis ako nisi zadovoljan
let lastAddedCoordinates;

btn10x10.addEventListener('click', event => {
  clickCount++;

  if (clickCount === 2) {
    // Kreiraj dugme za brisanje
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-coordinates';
    deleteButton.textContent = 'Delete';

    // Kreirati dugme za brisanje poslednjeg diva
    const deleteLastButton = document.createElement('button');
    deleteLastButton.id = 'delete-last-button';
    deleteLastButton.textContent = 'Delete last';

    // Dodaj event listener za brisanje
    deleteButton.addEventListener('click', () => {
      coordinatesContainer.innerHTML = '';
      clickCount = 0;
      placeForDeleteBtn.innerHTML = '';
    });

    // Dodaj event listnere za brisanje poslednjeg dodatog elementa
    deleteLastButton.addEventListener('click', () => {
      if (clickCount > 0) {
        const lastCoordinates = document.getElementById(`coordinates-${clickCount}`);
        if (lastCoordinates) {
          coordinatesContainer.removeChild(lastCoordinates);
          clickCount--;
          lastAddedCoordinates = document.getElementById(`coordinates-${clickCount}`);
          if (clickCount = 0) {
            placeForDeleteBtn.innerHTML = '';
          }
        }
      }
    });

    // Dodaj dugme za brisanje u 'coordinates-container'
    placeForDeleteBtn.appendChild(deleteButton);

    // Dodaj dugme za brisanje poslednjeg elementa u 'coordinates-container'
    placeForDeleteBtn.appendChild(deleteLastButton);
  }

  let input10x10Value = myInput10x10.value;

  if (input10x10Value.length !== 4) {
    alert('Moraš da uneseš ispravnu kombinaciju 2 slova i 2 broja! (UTM10x10 priemer: DQ36, FP12, EQ71... ');
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
  newCoordinates.id = `coordinates-${clickCount}`; // ID elementa sa brojem clickCount
  coordinatesContainer.appendChild(newCoordinates);

  lastAddedCoordinates = newCoordinates;
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
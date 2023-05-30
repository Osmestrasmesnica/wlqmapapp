const myInput10x10 = document.querySelector('[name="add10x10"]');
let btn10x10 = document.querySelector('.btn10x10');
let coordinatesContainer = document.getElementById('coordinates-container');
let clickCount = 0;
let placeForDeleteBtn = document.querySelector('.buttons-for-delete'); //!ovo mozes jos malo u CSS da sredis ako nisi zadovoljan
let lastAddedCoordinates;

btn10x10.addEventListener('click', event => {
  clickCount++;

  if (clickCount === 1) {
    // Kreiraj dugme za brisanje
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete-coordinates';
    deleteButton.textContent = 'Delete all ';

    // Kreirati dugme za brisanje poslednjeg diva
    const deleteLastButton = document.createElement('button');
    deleteLastButton.id = 'delete-last-button';
    deleteLastButton.textContent = 'Delete last';

    // Dodaj event lisener za brisanje
    deleteButton.addEventListener('click', () => {
      coordinatesContainer.innerHTML = '';
      clickCount = 0;
      placeForDeleteBtn.innerHTML = '';
    });

    // Dodaj event lisenere za brisanje poslednjeg dodatog elementa
    deleteLastButton.addEventListener('click', () => {
      if (clickCount > 0) {
        const lastCoordinates = document.getElementById(`coordinates-${clickCount}`);
        if (lastCoordinates) {
          coordinatesContainer.removeChild(lastCoordinates);
          clickCount--;
          lastAddedCoordinates = document.getElementById(`coordinates-${clickCount}`);
          if (clickCount === 0) {
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

  // Add click event listener to the newCoordinates div
  newCoordinates.addEventListener('click', event => {
    // Close any open tooltips
    const openTooltip = document.querySelector('.options-container.show');
    if (openTooltip) {
      openTooltip.remove('');
    }

    // Create the options container element
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    // Create the options
    const options = ['T', 'L', 'O', 'sumnjiv', 'netacanX'];

    // Create and append the option elements
    options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.textContent = option;
      optionElement.className = 'option';

      // Add click event listener to handle the option selection
      optionElement.addEventListener('click', () => {
        newCoordinates.className = option;
        optionsContainer.remove(); // Remove the options container once an option is selected
      });

      optionsContainer.appendChild(optionElement);
    });

    // Show the options container
    optionsContainer.classList.add('show');
    
    // Append the options container to the body
    document.body.appendChild(optionsContainer);
    
    // Adjust the size of the tooltip for smaller screens
    if (window.innerWidth <= 768) {
      optionsContainer.style.width = '150px';
    }

    // Position the options container above or below the clicked element
    const coordinatesRect = newCoordinates.getBoundingClientRect();
    const tooltipHeight = optionsContainer.offsetHeight;
    const tooltipWidth = optionsContainer.offsetWidth;
    const imgWrapperRect = newCoordinates.closest('.img-wrapper').getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollPosition = window.pageYOffset || window.scrollY;;

    // Calculate the maximum top position of the tooltip
    const maxTopPosition = imgWrapperRect.top + imgWrapperRect.height - tooltipHeight;
    console.log(imgWrapperRect.top, imgWrapperRect.height, tooltipHeight, maxTopPosition );

    // Calculate the maximum left position of the tooltip
    const maxLeftPosition = imgWrapperRect.left + imgWrapperRect.width - tooltipWidth;
    console.log(imgWrapperRect.left, imgWrapperRect.width, tooltipWidth, maxLeftPosition );

    // Calculate the desired top and left positions
    let tooltipTop = coordinatesRect.top - tooltipHeight + scrollPosition; // Account for vertical scroll position
    
    let tooltipLeft = coordinatesRect.left;

    // Adjust the tooltip position if it goes out of the screen or outside the img-wrapper
    if (tooltipTop < imgWrapperRect.top + scrollPosition) {
      tooltipTop = imgWrapperRect.top + scrollPosition; //ako je manji od toga onda je unutar nav menija, tako da se ovde postavlja da bude odmah ispod toga, u sustiti ovo imgWrapperRect.top je minimum visine na kojoj sme da bude tooltip
    } else if (tooltipTop > maxTopPosition + scrollPosition) {
      tooltipTop = maxTopPosition + scrollPosition; //ako je tooltip veci onda prelazi u futer, tako da se ovde postavlja da bude odmah iznad footera/menija sa varijablama
    }

    if (tooltipLeft < imgWrapperRect.left) {
      tooltipLeft = imgWrapperRect.left;
    } else if (tooltipLeft > maxLeftPosition) {
      tooltipLeft = maxLeftPosition;
    }

    // Set the final position of the tooltip
    optionsContainer.style.top = `${tooltipTop}px`;
    optionsContainer.style.left = `${tooltipLeft}px`;

    // Stop the click event propagation to prevent it from immediately closing the tooltip
    event.stopPropagation();
    });
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
    console.log('Nije uneto nijedno od mogućih slova za teritoriju Srbije.');
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
    console.log('Nije uneto nijedno od mogućih slova za teritoriju Srbije.');
    return '';
  }
}

// Add click event listener to the document
document.addEventListener('click', event => {
  const optionsContainer = document.querySelector('.options-container');

  // Check if the clicked element is outside the tooltip
  if (optionsContainer && !optionsContainer.contains(event.target)) {
    // Remove the tooltip from the DOM
    optionsContainer.remove();
  }
});

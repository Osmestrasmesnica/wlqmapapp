// Query all input elements with class 'css-input'
const inputElements = document.querySelectorAll('.variables input');
// Function to update the CSS variable
const liveUpdate = (event) => {
    // Get the value of the 'data-sizing' attribute
    const suffix = event.target.dataset.sizing || '';
    // Update the CSS variable
    document.documentElement.style.setProperty(`--${event.target.name}`, event.target.value + suffix);
};

// Add event listener for 'input' event
inputElements.forEach((input) => {
    input.addEventListener('input', liveUpdate);
});
//todo eventualno usmenog podatka
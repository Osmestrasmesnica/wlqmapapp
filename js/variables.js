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

//BTT btn - dugme koje vraca na pocetak ako postoji skrolovanje
var btn = $('#BTT');

$(window).scroll(function() {
  var windowHeight = $(window).height();
  var documentHeight = $(document).height();
  var scrollPercentage = ($(window).scrollTop() / (documentHeight - windowHeight)) * 100;

  if ($(window).scrollTop() > 0 && (scrollPercentage > 80 || $(window).scrollTop() + windowHeight === documentHeight)) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop: 0}, 200);
});

// Get the "Contact Us" link, the form container, and the close button
var contactLink = document.getElementById("contact").querySelector("a");
var formContainer = document.querySelector(".form-container");
var closeBtn = document.querySelector(".close-btn");

// Add a click event listener to the "Contact Us" link
contactLink.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the link from opening a new page
  formContainer.style.display = "flex"; // Show the form container
});

// Add a click event listener to the close button
closeBtn.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the button from submitting the form
  formContainer.style.display = "none"; // Hide the form container
});

// Get the form elements
var form = document.querySelector("form");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var messageInput = document.getElementById("message");

// Add a submit event listener to the form
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Build the email message from the form inputs
  var message = "Name: " + nameInput.value + "\nEmail: " + emailInput.value + "\nMessage: " + messageInput.value;

  // Use the EmailJS library to send the email
  emailjs.send("service_abcdefg", "template_123456", { message: message })
    .then(function(response) {
      alert("Email sent successfully!");
      form.reset(); // Reset the form
      formContainer.style.display = "none"; // Hide the form container
    }, function(error) {
      alert("An error occurred while sending the email: " + error.text);
    });
});

// Make sure to include the EmailJS library in your HTML file before the JavaScript code, and replace the service_abcdefg and template_123456 values in the emailjs.send() function with your own service ID and template ID, respectively.
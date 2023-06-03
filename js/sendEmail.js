// Get the "Contact Us" link, the form container, and the close button
var formContainer = document.querySelector(".form-container");
var closeBtn = document.querySelector(".close-btn");
var contacts = document.querySelectorAll(".contact-link");

// Show the form container when any "Contact Us" link is clicked
contacts.forEach(function(contact) {
  contact.addEventListener("click", function(event) {
    event.preventDefault();
    formContainer.style.display = "flex";
  });
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
var subjectInput = document.getElementById("subject");
var messageInput = document.getElementById("message");

// Add a submit event listener to the form
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Create a new FormData object
  var formData = new FormData();

  // Add form field values to the FormData object
  formData.append("name", nameInput.value);
  formData.append("email", emailInput.value);
  formData.append("subject", subjectInput.value);
  formData.append("message", messageInput.value);

  // Use the EmailJS library to send the email
  emailjs.send("EMAILJS_SERVICE_ID", "EMAILJS_TEMPLATE_ID", {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message")
  })
    .then(function(response) {
      alert("Email sent successfully!");
      form.reset(); // Reset the form
      formContainer.style.display = "none"; // Hide the form container
    })
    .catch(function(error) {
      alert("An error occurred while sending the email: " + error.text);
    });
});

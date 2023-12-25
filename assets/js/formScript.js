document.addEventListener("DOMContentLoaded", function () {
    console.log("clicked");
    const reservationForm = document.querySelector(".forms-left");
  
    if (reservationForm) {
      reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Validate email and phone
        const emailInput = reservationForm.querySelector('[name="email"]');
        const phoneInput = reservationForm.querySelector('[name="phone"]');
  
        if (!isValidEmail(emailInput.value)) {
          alert("Invalid email address, please provide a valid email to proceed!");
          return;
        }
  
        if (!isValidPhone(phoneInput.value)) {
          alert(
            "Invalid phone number, valid phone number musb be 10 digit number"
          );
          return;
        }
  
        const formData = new FormData(reservationForm);
  
        // Create an object from form data
        const formObject = {};
        formData.forEach(function (value, key) {
          formObject[key] = value;
        });
  
        console.log(formObject);
  
        // Use a CORS proxy to handle the cross-origin request
        fetch(
          "https://script.google.com/macros/s/AKfycbzrPu2eHUleekXkF1JA7XyLuV0MdAhMF5RWR5n9QWUovRP16W2zs202esrYHC3SV_A/exec",
          {
            method: "POST",
            body: JSON.stringify(formObject),
            headers: {
              "Content-Type": "application/json",
            },
            mode: "no-cors",
          }
        )
          .then((response) => response.text())
          .then((data) => {
            console.log("Form submission response:", data);
            // Clear form fields
            reservationForm.reset();
            // Show success alert
            alert("Form submitted successfully!");
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
          });
          return false; // or event.preventDefault();
      });
    } else {
      console.error('Element with class "forms-left" not found.');
    }
  
    // Validation function for email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Validation function for phone number
    function isValidPhone(phone) {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    }
  });
  
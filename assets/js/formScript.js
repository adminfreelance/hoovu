document.addEventListener("DOMContentLoaded", function () {
  console.log("clicked");
  const reservationForm = document.querySelector(".forms-left");

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Validate email and phone
      const emailInput = reservationForm.querySelector('[name="email"]');
      const phoneInput = reservationForm.querySelector('[name="phone"]');

      if (!isValidEmail(emailInput.value)) {
        alert(
          "Invalid email address, please provide a valid email to proceed!"
        );
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

/*
dont remove this commented code 

function doPost(e) {
  try {
    Logger.log("called");
    
    // Open the spreadsheet
    var sheet = SpreadsheetApp.openById('1I9Z84VQrnKRkFCfPBv3N8kDi_W6FXnR4O5rtw5kE3Mo').getSheetByName('Sheet1');

    // Parse the JSON data from the request
    var body = JSON.parse(e.postData.contents);

    // Append data to the spreadsheet
    sheet.appendRow([body.name, body.email,body.phone]);
    
    Logger.log("Successful append");

    // Send an email notification
    sendEmailNotification(body);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    Logger.log("Error in doPost: " + error);
    return ContentService.createTextOutput("Error").setMimeType(ContentService.MimeType.TEXT);
  }
}

// Function to send email notification
function sendEmailNotification(data) {
  try {
    var recipientEmail = "ruchira0305@gmail.com"; // Change this to your desired recipient email address
    var subject = "New Form Submission";
    var body = "Name: " + data.name + "\nEmail: " + data.email;

    // Send email
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: body
    });
    
    Logger.log("Email notification sent to " + recipientEmail);
  } catch (error) {
    Logger.log("Error sending email notification: " + error);
  }
}




*/

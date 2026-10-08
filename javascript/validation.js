document.addEventListener("DOMContentLoaded", () => {

  // Find the contact form.
  const form = document.getElementById("contactForm");

  // Stop if this is not the contact page.
  if (!form) return;


  /* ---------- EMAIL PATTERN ---------- */

  // This pattern checks for a basic structure such as:
  // student@example.com
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  /* ---------- FORM SUBMISSION EVENT ---------- */

  form.addEventListener("submit", (event) => {

    // Stop the browser from refreshing/submitting the page.
    event.preventDefault();

    // Assume the form is valid until an error is found.
    let isValid = true;


    /* ---------- FIND FORM ELEMENTS ---------- */

    const fullName =
      document.getElementById("fullName");

    const contactNumber =
      document.getElementById("Contact Number");

    const email =
      document.getElementById("Email");

    const message =
      document.getElementById("I am looking for...");

    const formStatus =
      document.getElementById("formStatus");

      /* ---------- RESET OLD ERRORS ---------- */

    formStatus.classList.remove("success");

    resetErrors([
      fullName,
      contactNumber,
      email,
      message
    ]);


    /* ---------- VALIDATE FULL NAME ---------- */

    if (fullName.value.trim().length < 3) {
      showError(fullName, "nameError");
      isValid = false;
    }


    /* ---------- VALIDATE CONTACT NUMBER ---------- */

    if (!contactNumber.value(contactNumber.value.trim())) {
      showError(contactNumber, "Contact NumberError");
      isValid = false;
    }


    /* ---------- VALIDATE EMAIL ---------- */

    if (email.test === "") {
      showError(email, "emailError");
      isValid = false;
    }


    /* ---------- VALIDATE MESSAGE ---------- */

    if (message.value.trim().length < 10) {
      showError(message, "i am lookinhg for...Error");
      isValid = false;
    }


    /* ---------- SUCCESS ---------- */

    if (isValid) {
      formStatus.classList.add("success");

      // Clear all entered values after successful validation.
      form.reset();
    }
  });


  /* ========================================================
     FUNCTION: showError
     Adds the error class to an input and displays its message.
     ======================================================== */

  function showError(inputElement, errorSpanId) {

    inputElement.classList.add("error");

    const errorSpan =
      document.getElementById(errorSpanId);

    if (errorSpan) {
      errorSpan.classList.add("visible");
    }
  }


  /* ========================================================
     FUNCTION: resetErrors
     Removes all old error styles/messages before validation.
     ======================================================== */

  function resetErrors(elements) {

    elements.forEach((element) => {
      element.classList.remove("error");
    });

    const errorSpans =
      document.querySelectorAll(".error-message");

    errorSpans.forEach((span) => {
      span.classList.remove("visible");
    });
  }

});

// validation.js - Form validation aligned with ContactUs.html and Enquiry.html
document.addEventListener('DOMContentLoaded', () => {

    // Helper function to display error messages in red
    function displayError(errorElement, message) {
        if (errorElement) {
            if (errorElement.textContent.trim() === "") {
                errorElement.textContent = message;
            }
            errorElement.style.cssText = 'color: #dc3545 !important; font-size: 0.85rem; display: block !important; margin-top: 4px;';
        }
    }

    // Helper function to hide error messages
    function hideError(errorElement) {
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // --- 1. CONTACT US PAGE VALIDATION ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Hide all errors initially
        contactForm.querySelectorAll('.error-message').forEach(el => hideError(el));

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            // Full Name validation (input name="fullname", span id="nameError")[cite: 2]
            const fullname = contactForm.querySelector('input[name="fullname"]');
            const nameError = document.getElementById('nameError');
            if (fullname) {
                if (fullname.value.trim() === "" || fullname.value.trim().length < 3) {
                    displayError(nameError, "Full Name is required (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(nameError);
                }
            }

            // Contact Number validation (input name="phone", span id="Contact NumberError")[cite: 2]
            const phone = contactForm.querySelector('input[name="phone"]');
            const phoneError = document.getElementById('Contact NumberError');
            if (phone) {
                if (phone.value.trim() === "" || phone.value.trim().length < 3) {
                    displayError(phoneError, "Contact Number is required (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(phoneError);
                }
            }

            // Email validation (input name="email", span id="EmailError")[cite: 2]
            const email = contactForm.querySelector('input[name="email"]');
            const emailError = document.getElementById('EmailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email) {
                if (email.value.trim() === "" || !emailRegex.test(email.value.trim()) || email.value.trim().length < 3) {
                    displayError(emailError, "Please enter a valid Email (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(emailError);
                }
            }

            // Intent / Message validation (input name="intent", span id="I am looking for...Error")[cite: 2]
            const intent = contactForm.querySelector('input[name="intent"]');
            const intentError = document.getElementById('I am looking for...Error');
            if (intent) {
                if (intent.value.trim().length > 0 && intent.value.trim().length < 3) {
                    displayError(intentError, "Information required... (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(intentError);
                }
            }

            if (isValid) {
                alert('Contact form submitted successfully!');
            }
        });
    }

    // --- 2. ENQUIRY PAGE VALIDATION ---
    // Note: If Enquiry.html doesn't have an ID on its form tag yet, 
    // this targets the first <form> element on the Enquiry page automatically.
    const enquiryForm = document.querySelector('main.enquiry-container form') || document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.querySelectorAll('.error-message').forEach(el => hideError(el));

        enquiryForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            // Full Name (input name="fullname")[cite: 3]
            const fullname = enquiryForm.querySelector('input[name="fullname"]');
            let nameErr = document.getElementById('enquiryNameError');
            if (fullname) {
                if (!nameErr) {
                    nameErr = document.createElement('span');
                    nameErr.className = 'error-message';
                    fullname.parentNode.appendChild(nameErr);
                }
                if (fullname.value.trim() === "" || fullname.value.trim().length < 3) {
                    displayError(nameErr, "Full Name is required (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(nameErr);
                }
            }

            // Email (input name="email")[cite: 3]
            const email = enquiryForm.querySelector('input[name="email"]');
            let emailErr = document.getElementById('enquiryEmailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email) {
                if (!emailErr) {
                    emailErr = document.createElement('span');
                    emailErr.className = 'error-message';
                    email.parentNode.appendChild(emailErr);
                }
                if (email.value.trim() === "" || !emailRegex.test(email.value.trim())) {
                    displayError(emailErr, "Please enter a valid Email address.");
                    isValid = false;
                } else {
                    hideError(emailErr);
                }
            }

            // Enquiry Category (select name="category")[cite: 3]
            const category = enquiryForm.querySelector('select[name="category"]');
            let catErr = document.getElementById('enquiryCategoryError');
            if (category) {
                if (!catErr) {
                    catErr = document.createElement('span');
                    catErr.className = 'error-message';
                    category.parentNode.appendChild(catErr);
                }
                if (category.value === "") {
                    displayError(catErr, "Please select an enquiry category.");
                    isValid = false;
                } else {
                    hideError(catErr);
                }
            }

            // Specific Request / Message (textarea name="message")[cite: 3]
            const message = enquiryForm.querySelector('textarea[name="message"]');
            let msgErr = document.getElementById('enquiryMessageError');
            if (message) {
                if (!msgErr) {
                    msgErr = document.createElement('span');
                    msgErr.className = 'error-message';
                    message.parentNode.appendChild(msgErr);
                }
                if (message.value.trim() === "" || message.value.trim().length < 3) {
                    displayError(msgErr, "Specific Request is required (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(msgErr);
                }
            }

            if (isValid) {
                alert('Enquiry submitted successfully!');
            }
        });
    }
});
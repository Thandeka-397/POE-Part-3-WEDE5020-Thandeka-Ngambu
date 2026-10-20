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

document.addEventListener("DOMContentLoaded", function () {
    // 1. Initialize EmailJS with your Public Key
    emailjs.init("B-qGO8fQe6G2WqPZv");

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Stop form submission / page refresh

            // Clear previous error messages
            clearErrors();

            // Get form inputs
            const nameInput = contactForm.querySelector('[name="fullname"]');
            const phoneInput = contactForm.querySelector('[name="phone"]');
            const emailInput = contactForm.querySelector('[name="email"]');
            const intentInput = contactForm.querySelector('[name="intent"]');
            const locationInput = contactForm.querySelector('[name="location"]');
            const enquiryTypeInput = contactForm.querySelector('[name="enquiry_type"]');
            const commentInput = contactForm.querySelector('[name="comment"]');

            let isValid = true;

            // --- Validation Rules ---

            // 1. Full Name Validation
            if (!nameInput.value.trim()) {
                showError("nameError", "Please enter your full name.");
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError("nameError", "Full name must be at least 2 characters.");
                isValid = false;
            }

            // 2. Phone Number Validation
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,15}$/;
            if (!phoneInput.value.trim()) {
                showError("Contact NumberError", "Please enter a contact number.");
                isValid = false;
            } else if (!phoneRegex.test(phoneInput.value.trim())) {
                showError("Contact NumberError", "Please enter a valid phone number (e.g., 041 110 1100).");
                isValid = false;
            }

            // 3. Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError("EmailError", "Please enter your email address.");
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError("EmailError", "Please enter a valid email address.");
                isValid = false;
            }

            // 4. Intent Field ("I am looking for...")
            if (!intentInput.value.trim()) {
                showError("I am looking for...Error", "Please specify what you are looking for.");
                isValid = false;
            }

            // 5. Location Select Check
            if (!locationInput.value) {
                alert("Please select a location.");
                isValid = false;
            }

            // 6. Enquiry Type Select Check
            if (!enquiryTypeInput.value) {
                alert("Please select a type of enquiry.");
                isValid = false;
            }

            // --- Submit with EmailJS if Valid ---
            if (isValid) {
                const submitBtn = contactForm.querySelector('.btn-submit-form');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;

                // Send email using EmailJS Service ID and Template ID
                emailjs.sendForm("service_mn36rq9", "template_iq9rf9d", contactForm)
                    .then(function () {
                        alert("Thank you! Your message has been sent successfully.");
                        contactForm.reset(); // Clear all fields
                    }, function (error) {
                        alert("Failed to send message: " + JSON.stringify(error));
                    })
                    .finally(function () {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    });
            }
        });
    }

    // Helper Function to Show Error Message in HTML
    function showError(elementId, message) {
        const errorSpan = document.getElementById(elementId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.color = "red";
            errorSpan.style.fontSize = "0.85rem";
        }
    }

    // Helper Function to Clear Error Messages
    function clearErrors() {
        const errorSpans = document.querySelectorAll('.error-message');
        errorSpans.forEach(span => {
            span.textContent = '';
        });
    }
});
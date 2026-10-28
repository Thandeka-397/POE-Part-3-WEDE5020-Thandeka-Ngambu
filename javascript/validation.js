// validation.js - Form validation and EmailJS integration for Contact Us and Enquiry pages
document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize EmailJS globally with your Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("B-qGO8fQe6G2WqPZv");
    }

    // Helper function to display error messages in red
    function displayError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.cssText = 'color: #dc3545 !important; font-size: 0.85rem; display: block !important; margin-top: 4px;';
        }
    }

    // Helper function to hide error messages
    function hideError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // --- 2. CONTACT US PAGE VALIDATION & EMAILJS ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.querySelectorAll('.error-message').forEach(el => hideError(el));

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

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
                const submitBtn = contactForm.querySelector('.btn-submit-form');
                const originalBtnText = submitBtn ? submitBtn.textContent : "Submit";
                if (submitBtn) {
                    submitBtn.textContent = "Sending...";
                    submitBtn.disabled = true;
                }

                emailjs.sendForm("service_mn36rq9", "template_iq9rf9d", contactForm)
                    .then(function () {
                        alert("Thank you! Your message has been sent successfully.");
                        contactForm.reset();
                    }, function (error) {
                        alert("Failed to send message: " + JSON.stringify(error));
                    })
                    .finally(function () {
                        if (submitBtn) {
                            submitBtn.textContent = originalBtnText;
                            submitBtn.disabled = false;
                        }
                    });
            }
        });
    }

    // --- 3. ENQUIRY PAGE VALIDATION & EMAILJS ---
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.querySelectorAll('.error-message').forEach(el => hideError(el));

        enquiryForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            const fullname = enquiryForm.querySelector('input[name="fullname"]');
            const nameErr = document.getElementById('enquiryNameError');
            if (fullname) {
                if (fullname.value.trim() === "" || fullname.value.trim().length < 3) {
                    displayError(nameErr, "Full Name is required (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(nameErr);
                }
            }

            const email = enquiryForm.querySelector('input[name="email"]');
            const emailErr = document.getElementById('enquiryEmailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email) {
                if (email.value.trim() === "" || !emailRegex.test(email.value.trim())) {
                    displayError(emailErr, "Please enter a valid Email address.");
                    isValid = false;
                } else {
                    hideError(emailErr);
                }
            }

            const category = enquiryForm.querySelector('select[name="category"]');
            const catErr = document.getElementById('enquiryCategoryError');
            if (category) {
                if (category.value === "") {
                    displayError(catErr, "Please select an enquiry category.");
                    isValid = false;
                } else {
                    hideError(catErr);
                }
            }

            const message = enquiryForm.querySelector('textarea[name="message"]');
            const msgErr = document.getElementById('enquiryMessageError');
            if (message) {
                if (message.value.trim() === "" || message.value.trim().length < 3) {
                    displayError(msgErr, "Specific Request is required (minimum 3 characters).");
                    isValid = false;
                } else {
                    hideError(msgErr);
                }
            }

            if (isValid) {
                const submitBtn = enquiryForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn ? submitBtn.textContent : "Submit Enquiry";
                if (submitBtn) {
                    submitBtn.textContent = "Sending...";
                    submitBtn.disabled = true;
                }

                // Collect checked availability checkboxes
                const checkedAvail = Array.from(enquiryForm.querySelectorAll('input[name="availability[]"]:checked'))
                    .map(cb => cb.value)
                    .join(', ') || 'None specified';

                // Map enquiry fields to template variables to ensure delivery
                const templateParams = {
                    fullname: fullname ? fullname.value : '',
                    email: email ? email.value : '',
                    phone: enquiryForm.querySelector('input[name="phone"]')?.value || 'N/A',
                    location: enquiryForm.querySelector('input[name="location"]')?.value || 'N/A',
                    enquiry_type: category ? category.value : '',
                    intent: `Enquiry Category: ${category ? category.value : ''} | Availability: ${checkedAvail}`,
                    comment: message ? message.value : ''
                };

                emailjs.send("service_mn36rq9", "template_iq9rf9d", templateParams)
                    .then(function () {
                        alert("Thank you! Your enquiry has been submitted successfully.");
                        enquiryForm.reset();
                    }, function (error) {
                        alert("Failed to submit enquiry: " + JSON.stringify(error));
                    })
                    .finally(function () {
                        if (submitBtn) {
                            submitBtn.textContent = originalBtnText;
                            submitBtn.disabled = false;
                        }
                    });
            }
        });
    }
});
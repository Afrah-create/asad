// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove("active");
        }
    });
});

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission for validation

        const name = contactForm.querySelector("input[name='name']").value.trim();
        const email = contactForm.querySelector("input[name='email']").value.trim();
        const phone = contactForm.querySelector("input[name='phone']").value.trim();
        const subject = contactForm.querySelector("select[name='subject']").value;
        const message = contactForm.querySelector("textarea[name='message']").value.trim();

        // Basic Validation
        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (phone !== "" && !validatePhone(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        alert("Your message has been sent successfully!");
        contactForm.reset(); // Clear the form after submission
    });
});

// Email Validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


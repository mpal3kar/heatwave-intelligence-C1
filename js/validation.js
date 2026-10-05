/* 
   JavaScript Form Validation Engine
   Student Authors: Mohammad Palekar (16010125167), Gaurav (16010125164), Samarth (16010125161)
*/

// Regular Expression Patterns
const regexPatterns = {
    name: /^[A-Za-z ]{3,}$/,
    mobile: /^[6-9]\d{9}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    stationId: /^AWS\d{3,}$/,
    userId: /^CLM-\d{4}$/,
    pinCode: /^\d{6}$/
};

// Generic validation helper
function validateField(inputElement, errorElement, condition, errorText) {
    if (!condition) {
        inputElement.classList.add("input-error");
        inputElement.classList.remove("input-success");
        errorElement.textContent = errorText;
        return false;
    } else {
        inputElement.classList.remove("input-error");
        inputElement.classList.add("input-success");
        errorElement.textContent = "";
        return true;
    }
}

// Full Stakeholder Registration Validation (register.html / Exp 5 Task 5 & 6)
document.addEventListener("DOMContentLoaded", function () {
    const regForm = document.getElementById("climateRegForm");
    if (regForm) {
        regForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let isValid = true;

            // 1. Observer / User Name
            const nameInput = document.getElementById("regName");
            const nameErr = document.getElementById("regNameErr");
            if (!validateField(nameInput, nameErr, regexPatterns.name.test(nameInput.value.trim()), "Name must contain only alphabets and spaces (min 3 chars)")) {
                isValid = false;
            }

            // 2. Mobile Number (10 digits starting 6-9)
            const mobileInput = document.getElementById("regMobile");
            const mobileErr = document.getElementById("regMobileErr");
            if (!validateField(mobileInput, mobileErr, regexPatterns.mobile.test(mobileInput.value.trim()), "Enter a valid 10-digit Indian mobile number (starts with 6-9)")) {
                isValid = false;
            }

            // 3. Email Address
            const emailInput = document.getElementById("regEmail");
            const emailErr = document.getElementById("regEmailErr");
            if (!validateField(emailInput, emailErr, regexPatterns.email.test(emailInput.value.trim()), "Enter a valid email address (e.g., user@domain.com)")) {
                isValid = false;
            }

            // 4. Climate User ID (Format: CLM-1234)
            const userIdInput = document.getElementById("regUserId");
            const userIdErr = document.getElementById("regUserIdErr");
            if (!validateField(userIdInput, userIdErr, regexPatterns.userId.test(userIdInput.value.trim()), "User ID must match CLM-XXXX format (e.g., CLM-1024)")) {
                isValid = false;
            }

            // 5. Location / City
            const cityInput = document.getElementById("regCity");
            const cityErr = document.getElementById("regCityErr");
            if (!validateField(cityInput, cityErr, cityInput.value.trim().length >= 2, "Location/City cannot be empty")) {
                isValid = false;
            }

            // 6. PIN Code (6 digits)
            const pinInput = document.getElementById("regPin");
            const pinErr = document.getElementById("regPinErr");
            if (!validateField(pinInput, pinErr, regexPatterns.pinCode.test(pinInput.value.trim()), "PIN code must be exactly 6 numeric digits")) {
                isValid = false;
            }

            // 7. Age Group
            const ageSelect = document.getElementById("regAge");
            const ageErr = document.getElementById("regAgeErr");
            if (!validateField(ageSelect, ageErr, ageSelect.value !== "", "Please select your age group")) {
                isValid = false;
            }

            // 8. User Category
            const catSelect = document.getElementById("regCategory");
            const catErr = document.getElementById("regCategoryErr");
            if (!validateField(catSelect, catErr, catSelect.value !== "", "Please select a user category")) {
                isValid = false;
            }

            // 9. Preferred Alert Channel
            const channelSelect = document.getElementById("regChannel");
            const channelErr = document.getElementById("regChannelErr");
            if (!validateField(channelSelect, channelErr, channelSelect.value !== "", "Please select an alert delivery channel")) {
                isValid = false;
            }

            // 10. Registration Date (must be entered and not future date)
            const dateInput = document.getElementById("regDate");
            const dateErr = document.getElementById("regDateErr");
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(23, 59, 59, 999);

            if (dateInput.value === "") {
                validateField(dateInput, dateErr, false, "Registration date is required");
                isValid = false;
            } else if (selectedDate > today) {
                validateField(dateInput, dateErr, false, "Registration date cannot be in the future");
                isValid = false;
            } else {
                validateField(dateInput, dateErr, true, "");
            }

            // Display Success Message if all valid
            const successBox = document.getElementById("regSuccessMsg");
            if (isValid) {
                successBox.style.display = "block";
                successBox.scrollIntoView({ behavior: 'smooth' });
            } else {
                successBox.style.display = "none";
            }
        });

        // Reset Handler
        regForm.addEventListener("reset", function () {
            document.querySelectorAll(".error-msg").forEach(span => span.textContent = "");
            document.querySelectorAll(".form-control").forEach(inp => {
                inp.classList.remove("input-error");
                inp.classList.remove("input-success");
            });
            const successBox = document.getElementById("regSuccessMsg");
            if (successBox) successBox.style.display = "none";
        });
    }

    // Quick Advisory Subscription Form (subscribe.html / Exp 1 Task 8 & Exp 4)
    const quickForm = document.getElementById("quickSubscribeForm");
    if (quickForm) {
        quickForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById("subName");
            const nameErr = document.getElementById("subNameErr");
            if (!validateField(name, nameErr, regexPatterns.name.test(name.value.trim()), "Valid name required (min 3 chars)")) {
                isValid = false;
            }

            const email = document.getElementById("subEmail");
            const emailErr = document.getElementById("subEmailErr");
            if (!validateField(email, emailErr, regexPatterns.email.test(email.value.trim()), "Valid email required")) {
                isValid = false;
            }

            const mobile = document.getElementById("subMobile");
            const mobileErr = document.getElementById("subMobileErr");
            if (!validateField(mobile, mobileErr, regexPatterns.mobile.test(mobile.value.trim()), "10-digit mobile starting 6-9 required")) {
                isValid = false;
            }

            const successBox = document.getElementById("subSuccessMsg");
            if (isValid && successBox) {
                successBox.style.display = "block";
            }
        });
    }
});

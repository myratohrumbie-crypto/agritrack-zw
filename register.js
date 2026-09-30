 import { setData } from "./storage.js";
 const registrationForm = document.getElementById("registration-form");


// this creates an error message for a field if it doesn't already exist.
function showError(field, message) {
    let errorMessage = document.getElementById(field.id + "-error");

    if (!errorMessage) {
        errorMessage = document.createElement("span");
        errorMessage.id = field.id + "-error";
        errorMessage.style.display = "block";
        errorMessage.style.marginTop = "5px";
        errorMessage.style.color = "red";

        field.parentElement.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
}


// This clears the error message for a field
function clearError(field) {
    const errorMessage = document.getElementById(field.id + "-error");

    if (errorMessage) {
        errorMessage.textContent = "";
    }
}


// Validating the Full Name
function validateFullName() {
    const field = document.getElementById("full-name");
    const value = field.value.trim();

    if (value === "") {
        showError(field, "Full name is required.");
        return false;
    }

    if (value.length < 3) {
        showError(field, "Full name must be at least 3 characters.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating Email
function validateEmail() {
    const field = document.getElementById("email");
    const value = field.value.trim();

    if (value === "") {
        showError(field, "Email address is required.");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(field, "Please enter a valid email address.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating phone number
function validatePhone() {
    const field = document.getElementById("phone");
    const value = field.value.trim();

    if (value === "") {
        showError(field, "Phone number is required.");
        return false;
    }

    if (!/^\+\d{12}$/.test(value)) {
        showError(field, "Use the format +263771234567.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating National ID
function validateNationalId() {
    const field = document.getElementById("national-id");
    const value = field.value.trim();

    if (value === "") {
        showError(field, "National ID number is required.");
        return false;
    }

    if (value.length < 7) {
        showError(field, "National ID must be at least 7 characters.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating farm size
function validateFarmSize() {
    const field = document.getElementById("farm-size");
    const value = field.value.trim();

    if (value === "") {
        showError(field, "Farm size is required.");
        return false;
    }

    if (Number(value) <= 0) {
        showError(field, "Farm size must be greater than 0.");
        return false;
    }

    clearError(field);
    return true;
}


// Validates Province
function validateProvince() {
    const field = document.getElementById("province");

    if (field.value === "") {
        showError(field, "Please select a province.");
        return false;
    }

    clearError(field);
    return true;
}


// Validates District
function validateDistrict() {
    const field = document.getElementById("district");

    if (field.value.trim() === "") {
        showError(field, "District is required.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating growing season
function validateGrowingSeason() {
    const field = document.querySelector('input[name="growing-season"]:checked');
    const firstRadio = document.getElementById("summer-season");

    if (!field) {
        showError(firstRadio, "Please select a growing season.");
        return false;
    }

    clearError(firstRadio);
    return true;
}


// Validating Irrigation Type
function validateIrrigation() {
    const field = document.getElementById("irrigation-type");

    if (field.value === "") {
        showError(field, "Please select an irrigation type.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating the password
function validatePassword() {
    const field = document.getElementById("password");
    const value = field.value;

    if (value === "") {
        showError(field, "Password is required.");
        return false;
    }

    if (value.length < 8) {
        showError(field, "Password must be at least 8 characters.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating confirm password
function validateConfirmPassword() {
    const field = document.getElementById("confirm-password");
    const password = document.getElementById("password").value;

    if (field.value === "") {
        showError(field, "Please confirm your password.");
        return false;
    }

    if (field.value !== password) {
        showError(field, "Passwords do not match.");
        return false;
    }

    clearError(field);
    return true;
}


// Validating terms and conditions
function validateTerms() {
    const field = document.getElementById("terms");

    if (!field.checked) {
        showError(field, "You must agree to the terms and conditions.");
        return false;
    }

    clearError(field);
    return true;
}


// Check fields when the user leaves them
document.getElementById("full-name").addEventListener("blur", validateFullName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhone);
document.getElementById("national-id").addEventListener("blur", validateNationalId);
document.getElementById("farm-size").addEventListener("blur", validateFarmSize);
document.getElementById("province").addEventListener("blur", validateProvince);
document.getElementById("district").addEventListener("blur", validateDistrict);
document.getElementById("irrigation-type").addEventListener("blur", validateIrrigation);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirm-password").addEventListener("blur", validateConfirmPassword);


// Validate everything when the form is submitted
registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const validFullName = validateFullName();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validNationalId = validateNationalId();
    const validFarmSize = validateFarmSize();
    const validProvince = validateProvince();
    const validDistrict = validateDistrict();
    const validGrowingSeason = validateGrowingSeason();
    const validIrrigation = validateIrrigation();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const validTerms = validateTerms();

    const formIsValid =
        validFullName &&
        validEmail &&
        validPhone &&
        validNationalId &&
        validFarmSize &&
        validProvince &&
        validDistrict &&
        validGrowingSeason &&
        validIrrigation &&
        validPassword &&
        validConfirmPassword &&
        validTerms;

    if (!formIsValid) {
        return;
    }
    const selectedCrops = Array.from(
    document.querySelectorAll('input[name="crops"]:checked')
).map(crop => crop.value);

const selectedSeason = document.querySelector(
    'input[name="growing-season"]:checked'
);

const farmDetails = {
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    nationalId: document.getElementById("national-id").value,
    farmSize: document.getElementById("farm-size").value,
    province: document.getElementById("province").value,
    district: document.getElementById("district").value,
    crops: selectedCrops,
    growingSeason: selectedSeason ? selectedSeason.value : "",
    irrigationType: document.getElementById("irrigation-type").value,
    notes: document.getElementById("notes").value
};

setData("agritrackFarmDetails", farmDetails);

    let successMessage = document.getElementById("registration-success");

    if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.id = "registration-success";
        successMessage.style.color = "red";
        successMessage.style.fontWeight = "bold";

        registrationForm.parentElement.insertBefore(
            successMessage,
            registrationForm
        );
    }

    successMessage.textContent =
        "Farm account created successfully!";

    registrationForm.reset();
});


// Clear errors when the Clear Form button is used
registrationForm.addEventListener("reset", () => {
    setTimeout(() => {
        document.querySelectorAll("span[id$='-error']").forEach((error) => {
            error.textContent = "";
        });
    }, 0);
});
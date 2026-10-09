/* ==========================================================
   ICT251 Activity 3 - script.js
   Four features:
   1. Contact form validation and preview (compulsory)
   2. Theme switch (light / dark)
   3. Gallery viewer (Previous / Next)
   4. Expandable project details
   The script is loaded with "defer", so the page is ready
   when this code runs.
   ========================================================== */


/* ----------------------------------------------------------
   FEATURE 1: Contact form validation and preview
   ---------------------------------------------------------- */

const contactForm = document.getElementById("contact-form");
const themeToggle = document.getElementById("theme-toggle");
const galleryBox = document.getElementById("gallery");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const messageInput = document.getElementById("message");
const previewBox = document.getElementById("form-preview");

// Letters/numbers, one @, then a domain with a dot and a 2+ letter ending
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

// Shows (or clears) an error message under a field
function setFieldError(input, message) {
  const errorBox = document.getElementById(input.id + "-error");
  errorBox.textContent = message;
  if (message) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

// Returns an error message for the name, or "" if it is fine.
// trim() removes spaces so a name of only spaces counts as empty.
function checkName(value) {
  if (value.trim() === "") {
    return "Please enter your name (spaces alone are not accepted).";
  }
  return "";
}

// Returns an error message for the email, or "" if it is fine
function checkEmail(value) {
  const email = value.trim();
  if (email === "") {
    return "Please enter your email address.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address, for example name@example.com.";
  }
  return "";
}

// Returns an error message for the message, or "" if it is fine
function checkMessage(value) {
  if (value.trim() === "") {
    return "Please write a message (spaces alone are not accepted).";
  }
  return "";
}

// Runs all three checks, shows the errors, and returns true only if all pass
function validateForm() {
  const checks = [
    { input: nameInput, error: checkName(nameInput.value) },
    { input: emailInput, error: checkEmail(emailInput.value) },
    { input: messageInput, error: checkMessage(messageInput.value) }
  ];

  let firstInvalid = null;
  checks.forEach(function (check) {
    setFieldError(check.input, check.error);
    if (check.error && firstInvalid === null) {
      firstInvalid = check.input;
    }
  });

  if (firstInvalid) {
    firstInvalid.focus(); // send the visitor to the first problem
    return false;
  }
  return true;
}

// Fills the preview box. textContent is used so anything typed is shown
// as plain text and can never run as HTML.
function showPreview() {
  document.getElementById("preview-status").textContent =
    "Your details passed validation in this browser. No message was sent or stored.";
  document.getElementById("preview-name").textContent = nameInput.value.trim();
  document.getElementById("preview-email").textContent = emailInput.value.trim();
  document.getElementById("preview-topic").textContent = topicSelect.value;
  document.getElementById("preview-message").textContent = messageInput.value.trim();
  previewBox.hidden = false;
}

// Submit: stop the page reloading, validate, then show the preview
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  previewBox.hidden = true;
  if (validateForm()) {
    showPreview();
  }
});

// Clear: remove errors and the preview
contactForm.addEventListener("reset", function () {
  [nameInput, emailInput, messageInput].forEach(function (input) {
    setFieldError(input, "");
  });
  previewBox.hidden = true;
});

// Remove a field's error as soon as the visitor starts fixing it
[nameInput, emailInput, messageInput].forEach(function (input) {
  input.addEventListener("input", function () {
    setFieldError(input, "");
  });
});


/* ----------------------------------------------------------
   FEATURE 2: Theme switch (light / dark)
   ---------------------------------------------------------- */

const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "portfolio-theme";

// Sets the theme on <html> and updates the button label
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

// Reads the saved theme. try/catch because storage can be blocked.
function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // Saving is optional, so ignore the error
  }
}

// Flips between light and dark each time the button is clicked
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  saveTheme(next);
}

// Start with the saved choice, otherwise the visitor's device setting
const savedTheme = getSavedTheme();
const prefersDark =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", toggleTheme);


/* ----------------------------------------------------------
   FEATURE 3: Gallery viewer (Previous / Next)
   ---------------------------------------------------------- */

const galleryBox = document.getElementById("gallery");
const galleryControls = document.getElementById("gallery-controls");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const galleryStatus = document.getElementById("gallery-status");

// An array of the photo figures (image + caption) already in the HTML
const photos = Array.from(galleryBox.querySelectorAll("figure"));
let currentPhoto = 0;

// Shows one photo, hides the rest, and updates the counter and buttons.
// Previous is disabled on the first photo and Next on the last.
function showPhoto(index) {
  currentPhoto = index;
  photos.forEach(function (figure, i) {
    figure.hidden = i !== index;
  });
  galleryStatus.textContent = "Photo " + (index + 1) + " of " + photos.length;
  galleryPrev.disabled = index === 0;
  galleryNext.disabled = index === photos.length - 1;
}

galleryPrev.addEventListener("click", function () {
  if (currentPhoto > 0) {
    showPhoto(currentPhoto - 1);
  }
});

galleryNext.addEventListener("click", function () {
  if (currentPhoto < photos.length - 1) {
    showPhoto(currentPhoto + 1);
  }
});

// Switch on the viewer (without JavaScript all photos simply stay visible)
if (photos.length > 0) {
  galleryBox.classList.add("viewer");
  galleryControls.hidden = false;
  showPhoto(0);
}


/* ----------------------------------------------------------
   FEATURE 4: Expandable project details
   ---------------------------------------------------------- */

// Opens or closes one project's details and updates the button state
function toggleDetails(button) {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  const isOpen = button.getAttribute("aria-expanded") === "true";

  button.setAttribute("aria-expanded", String(!isOpen));
  button.textContent = isOpen ? "Show details" : "Hide details";
  panel.hidden = isOpen;
}

document.querySelectorAll(".details-toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    toggleDetails(button);
  });
});

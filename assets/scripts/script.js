// Toggle page visibility
function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.remove("active"));
  document.getElementById(pageId)?.classList.add("active");
}

// Search input: filters pages + cards
function searchPages() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const pages = document.querySelectorAll(".page");
  const homePage = document.getElementById("home");

  // Show all cards inside the currently active page
  function showAllCards() {
    document.querySelectorAll(".text-start").forEach((card) => {
      card.style.display = "block";
    });
  }

  // Filter cards inside active page
  function filterCards(query) {
    document.querySelectorAll(".page.active .text-start").forEach((card) => {
      const match = card.innerText.toLowerCase().includes(query);
      card.style.display = match ? "block" : "none";
    });
  }

  if (query === "") {
    // Reset state
    showPage("home");
    pages.forEach((page) => {
      if (page.id !== "home") page.classList.remove("active");
    });
    showAllCards();
  } else {
    // Show only pages that match query
    homePage.classList.remove("active");

    pages.forEach((page) => {
      const match = page.innerText.toLowerCase().includes(query);
      page.classList.toggle("active", match);
    });

    filterCards(query);
  }
}

// Open a popup window with provided URL
function openPopup(url) {
  window.open(url, "popupWindow", "width=auto,height=auto,scrollbars=yes");
}

// ===== THEME SWITCHER =====
const themeSelectors = document.querySelectorAll(".theme-selector");

themeSelectors.forEach((selector) => {
  selector.addEventListener("change", function () {
    // Remove existing theme-* classes
    document.body.className = document.body.className
      .split(" ")
      .filter((cls) => !cls.startsWith("theme-"))
      .join(" ");

    // Add selected theme class
    document.body.classList.add("theme-" + this.value);

    // Optional: preserve dark mode
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.add("dark-mode");
    }

    // Save theme
    localStorage.setItem("theme", this.value);
  });
});

// ===== DARK MODE TOGGLE =====
const toggleButtons = document.querySelectorAll(".toggle-dark");
const body = document.body;

function updateDarkMode() {
  const isDark = body.classList.toggle("dark-mode");
  toggleButtons.forEach((btn) => {
    btn.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
  });
}

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", updateDarkMode);
});

// ===== TEXT SIZE SWITCHER =====
function setTextSize(sizeClass) {
  document.body.classList.remove(
    "scale-small",
    "scale-medium",
    "scale-large",
    "scale-xlarge"
  );
  document.body.classList.add(sizeClass);
  localStorage.setItem("text-size", sizeClass);
}

// ===== INITIAL SETUP =====
window.addEventListener("DOMContentLoaded", () => {
  // Get saved theme or default to 'green'
  const savedTheme = localStorage.getItem("theme") || "green";

  // Apply theme
  document.body.className = ""; // Clear existing classes
  document.body.classList.add("theme-" + savedTheme);

  // Update selector UI if needed
  if (themeSelector) themeSelector.value = savedTheme;
});

// Optional: Persist mode across reloads
if (localStorage.getItem("dark-mode") === "true") {
  body.classList.add("dark-mode");
  toggleButtons.forEach((btn) => (btn.textContent = "Light Mode"));
}

body.addEventListener("classChange", () => {
  localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
});

// ===== TOGLLE SECTION VISIBILITY ====//
function toggleSection(id) {
  var section = document.getElementById(id);
  section.style.display = section.style.display === "none" ? "block" : "none";
}

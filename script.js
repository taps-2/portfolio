document.documentElement.classList.add("js");

var EMAIL = "thapelo.seshabela@icloud.com";

/* ---------- Dark mode ---------- */
var themeToggle = document.getElementById("themeToggle");

function updateThemeLabel() {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateThemeLabel();
});

updateThemeLabel();

/* ---------- Mobile menu ---------- */
var menuToggle = document.getElementById("menuToggle");
var navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

/* ---------- Copy email ---------- */
var copyBtn = document.getElementById("copyEmail");
var copyStatus = document.getElementById("copyStatus");

copyBtn.addEventListener("click", function () {
    function done(ok) {
        copyStatus.textContent = ok ? "Email copied to clipboard." : "Couldn't copy. Please copy it manually.";
        setTimeout(function () { copyStatus.textContent = ""; }, 3000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(function () { done(true); }, function () { done(false); });
    } else {
        done(false);
    }
});

/* ---------- Contact form (opens the visitor's email app) ---------- */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    var subject = "Portfolio message from " + name;
    var body = message + "\n\n" + name + "\n" + email;

    window.location.href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
});

/* ---------- Scroll reveal ---------- */
var revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
} else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
}

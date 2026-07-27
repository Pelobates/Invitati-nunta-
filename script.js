// 1) După publicarea Apps Script, înlocuiește adresa de mai jos cu URL-ul /exec.
const GOOGLE_SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

// 2) Schimbă data nunții aici: an, luna-1, zi, oră.
const WEDDING_DATE = new Date(2027, 8, 12, 15, 0, 0);

const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");
const attendanceDetails = document.getElementById("attendanceDetails");
const companionNameField = document.getElementById("companionNameField");
const companionMenuField = document.getElementById("companionMenuField");
const menu = document.getElementById("meniu");
const companionName = document.getElementById("insotitor");
const companionMenu = document.getElementById("meniu_insotitor");

// Permite linkuri personalizate de forma: site.ro/?nume=Ion%20Popescu&id=INV123
const params = new URLSearchParams(window.location.search);
if (params.get("nume")) document.getElementById("nume").value = params.get("nume");
if (params.get("id")) document.getElementById("invitatId").value = params.get("id");

document.querySelectorAll('input[name="participa"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const participates = radio.value === "Da" && radio.checked;
    attendanceDetails.classList.toggle("hidden", !participates);
    menu.required = participates;
    document.querySelectorAll('input[name="prezenta"]').forEach(r => r.required = participates);
    if (!participates) resetCompanion();
  });
});

document.querySelectorAll('input[name="prezenta"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const accompanied = radio.value === "Insotit" && radio.checked;
    companionNameField.classList.toggle("hidden", !accompanied);
    companionMenuField.classList.toggle("hidden", !accompanied);
    companionName.required = accompanied;
    companionMenu.required = accompanied;
    if (!accompanied) {
      companionName.value = "";
      companionMenu.value = "";
    }
  });
});

function resetCompanion() {
  document.querySelectorAll('input[name="prezenta"]').forEach(r => { r.checked = false; r.required = false; });
  menu.required = false;
  menu.value = "";
  companionNameField.classList.add("hidden");
  companionMenuField.classList.add("hidden");
  companionName.required = false;
  companionMenu.required = false;
  companionName.value = "";
  companionMenu.value = "";
}

form.addEventListener("submit", (event) => {
  if (GOOGLE_SCRIPT_URL.includes("PASTE_")) {
    event.preventDefault();
    statusEl.textContent = "Mai întâi adaugă URL-ul Google Apps Script în script.js.";
    statusEl.className = "status error";
    return;
  }

  form.action = GOOGLE_SCRIPT_URL;
  submitButton.disabled = true;
  submitButton.textContent = "Se trimite...";
  statusEl.textContent = "";

  // Formularul este trimis într-un iframe ascuns, evitând problemele CORS.
  setTimeout(() => {
    statusEl.textContent = "Mulțumim! Răspunsul a fost înregistrat.";
    statusEl.className = "status success";
    submitButton.disabled = false;
    submitButton.textContent = "Trimite confirmarea";
    form.reset();
    attendanceDetails.classList.add("hidden");
    resetCompanion();
  }, 1400);
});

function updateCountdown() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  const root = document.getElementById("countdown");
  if (diff <= 0) {
    root.innerHTML = "<p>A sosit ziua cea mare! ♡</p>";
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  root.innerHTML = [
    [days, "zile"], [hours, "ore"], [minutes, "minute"], [seconds, "secunde"]
  ].map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("");
}
updateCountdown();
setInterval(updateCountdown, 1000);

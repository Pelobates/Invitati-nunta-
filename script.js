// URL-ul aplicației Apps Script publicate
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwwM7fltVTLvWpeW9uXKeddc7iAnA06oHFtApK12mSh4oZOBfdS3Jb05DKGef3VRdN1Fg/exec";

// Data nunții
const WEDDING_DATE = new Date(2026, 9, 24, 15, 0, 0);

const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");
const attendanceDetails = document.getElementById("attendanceDetails");
const companionNameField = document.getElementById("companionNameField");
const companionMenuField = document.getElementById("companionMenuField");
const menu = document.getElementById("meniu");
const companionName = document.getElementById("insotitor");
const companionMenu = document.getElementById("meniu_insotitor");

// Linkuri personalizate
const params = new URLSearchParams(window.location.search);

if (params.get("nume"))
  document.getElementById("nume").value = params.get("nume");

if (params.get("id"))
  document.getElementById("invitatId").value = params.get("id");

// Participă?
document.querySelectorAll('input[name="participa"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const participates = radio.value === "Da" && radio.checked;

    attendanceDetails.classList.toggle("hidden", !participates);

    menu.required = participates;

    document
      .querySelectorAll('input[name="prezenta"]')
      .forEach((r) => (r.required = participates));

    if (!participates) resetCompanion();
  });
});

// Singur / Însoțit
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
  document.querySelectorAll('input[name="prezenta"]').forEach((r) => {
    r.checked = false;
    r.required = false;
  });

  menu.required = false;
  menu.value = "";

  companionNameField.classList.add("hidden");
  companionMenuField.classList.add("hidden");

  companionName.required = false;
  companionMenu.required = false;

  companionName.value = "";
  companionMenu.value = "";
}

// ==========================
// TRIMITERE RSVP
// ==========================
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Se trimite...";
  statusEl.textContent = "";

  const formData = new FormData(form);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });

    statusEl.textContent = "Mulțumim! Răspunsul a fost înregistrat.";
    statusEl.className = "status success";

    form.reset();
    attendanceDetails.classList.add("hidden");
    resetCompanion();

  } catch (error) {
    console.error(error);

    statusEl.textContent =
      "A apărut o eroare la trimiterea formularului.";

    statusEl.className = "status error";

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Trimite confirmarea";
  }
});

// Countdown
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

  root.innerHTML = `
      <div><strong>${days}</strong><span>zile</span></div>
      <div><strong>${hours}</strong><span>ore</span></div>
      <div><strong>${minutes}</strong><span>minute</span></div>
      <div><strong>${seconds}</strong><span>secunde</span></div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

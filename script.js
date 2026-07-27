// URL-ul aplicației Apps Script publicate
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwwM7fltVTLvWpeW9uXKeddc7iAnA06oHFtApK12mSh4oZOBfdS3Jb05DKGef3VRdN1Fg/exec";

// Data nunții: anul, luna minus 1, ziua, ora
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
const hiddenIframe = document.getElementById("hidden_iframe");

// Setează destinația formularului
form.action = GOOGLE_SCRIPT_URL;
form.method = "POST";
form.target = "hidden_iframe";

// Permite linkuri personalizate:
// site.ro/?nume=Ion%20Popescu&id=INV123
const params = new URLSearchParams(window.location.search);

if (params.get("nume")) {
  document.getElementById("nume").value = params.get("nume");
}

if (params.get("id")) {
  document.getElementById("invitatId").value = params.get("id");
}

// Participă sau nu
document
  .querySelectorAll('input[name="participa"]')
  .forEach((radio) => {
    radio.addEventListener("change", () => {
      const participates =
        radio.checked && radio.value === "Da";

      attendanceDetails.classList.toggle(
        "hidden",
        !participates
      );

      menu.required = participates;

      document
        .querySelectorAll('input[name="prezenta"]')
        .forEach((item) => {
          item.required = participates;
        });

      if (!participates) {
        resetCompanion();
      }
    });
  });

// Singur sau însoțit
document
  .querySelectorAll('input[name="prezenta"]')
  .forEach((radio) => {
    radio.addEventListener("change", () => {
      const accompanied =
        radio.checked && radio.value === "Insotit";

      companionNameField.classList.toggle(
        "hidden",
        !accompanied
      );

      companionMenuField.classList.toggle(
        "hidden",
        !accompanied
      );

      companionName.required = accompanied;
      companionMenu.required = accompanied;

      if (!accompanied) {
        companionName.value = "";
        companionMenu.value = "";
      }
    });
  });

function resetCompanion() {
  document
    .querySelectorAll('input[name="prezenta"]')
    .forEach((radio) => {
      radio.checked = false;
      radio.required = false;
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

// Marchează dacă formularul a fost trimis.
// Iframe-ul se încarcă și la deschiderea paginii,
// deci nu trebuie să afișăm succes atunci.
let formWasSubmitted = false;

form.addEventListener("submit", () => {
  formWasSubmitted = true;

  submitButton.disabled = true;
  submitButton.textContent = "Se trimite...";

  statusEl.textContent = "";
  statusEl.className = "status";
});

// După ce Apps Script răspunde,
// pagina răspunsului se încarcă în iframe-ul ascuns.
hiddenIframe.addEventListener("load", () => {
  if (!formWasSubmitted) {
    return;
  }

  formWasSubmitted = false;

  statusEl.textContent =
    "Mulțumim! Răspunsul a fost înregistrat.";
  statusEl.className = "status success";

  submitButton.disabled = false;
  submitButton.textContent = "Trimite confirmarea";

  form.reset();
  attendanceDetails.classList.add("hidden");
  resetCompanion();
});

// Cronometru
function updateCountdown() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  const root = document.getElementById("countdown");

  if (diff <= 0) {
    root.innerHTML =
      "<p>A sosit ziua cea mare! ♡</p>";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(
    (diff / 3600000) % 24
  );
  const minutes = Math.floor(
    (diff / 60000) % 60
  );
  const seconds = Math.floor(
    (diff / 1000) % 60
  );

  root.innerHTML = `
    <div>
      <strong>${days}</strong>
      <span>zile</span>
    </div>
    <div>
      <strong>${hours}</strong>
      <span>ore</span>
    </div>
    <div>
      <strong>${minutes}</strong>
      <span>minute</span>
    </div>
    <div>
      <strong>${seconds}</strong>
      <span>secunde</span>
    </div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

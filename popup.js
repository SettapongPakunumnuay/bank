const timeSelect = document.getElementById("time");
for (let hour = 10; hour <= 20; hour++) {
  ["30", "00"].forEach((m, i) => {
    if (hour === 10 && i === 0) return; 
    const h = hour.toString().padStart(2, "0");
    const t = `${h}:${m}`;
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    timeSelect.appendChild(opt);
  });
}
timeSelect.appendChild(new Option("21:00", "21:00"));

// โหลดค่าจาก LocalStorage
window.onload = () => {
  const config = JSON.parse(localStorage.getItem("config")) || {};
  if (config) {
    document.getElementById("branch").value = config.targetBranch || "";
    document.getElementById("date").value = config.targetDate || "";
    document.getElementById("time").value = config.targetTime || "";
    document.getElementById("autoRun").checked = config.autoRun || false;
  }
};

function saveSettings() {
  const config = {
    targetBranch: document.getElementById("branch").value,
    targetDate: document.getElementById("date").value,
    targetTime: document.getElementById("time").value,
    autoRun: document.getElementById("autoRun").checked
  };
  localStorage.setItem("config", JSON.stringify(config));
  alert("✅ Settings Saved");
}

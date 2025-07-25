
const timeSelect = document.getElementById("time");
for (let h = 10; h <= 20; h++) {
  ["00", "30"].forEach(m => {
    const hh = h.toString().padStart(2, "0");
    const opt = document.createElement("option");
    opt.value = opt.textContent = `${hh}:${m}`;
    timeSelect.appendChild(opt);
  });
}
let final = document.createElement("option");
final.value = final.textContent = "21:00";
timeSelect.appendChild(final);

document.getElementById("save").addEventListener("click", () => {
  const config = {
    targetBranch: document.getElementById("branch").value,
    targetDate: document.getElementById("date").value,
    targetTime: document.getElementById("time").value,
    autoRun: document.getElementById("autoRun").checked
  };
  localStorage.setItem("popmart_config", JSON.stringify(config));
  alert("✅ Settings Saved");
});
window.addEventListener("load", () => {
  const config = JSON.parse(localStorage.getItem("popmart_config") || "{}");
  if (config.targetBranch) document.getElementById("branch").value = config.targetBranch;
  if (config.targetDate) document.getElementById("date").value = config.targetDate;
  if (config.targetTime) document.getElementById("time").value = config.targetTime;
  document.getElementById("autoRun").checked = config.autoRun ?? true;
});

setTimeout(() => {
  const config = JSON.parse(localStorage.getItem("config") || "{}");
  if (!config.autoRun) return;

  const { targetBranch, targetDate, targetTime } = config;
  console.log("🤖 Running bot with config:", config);

  const waitFor = (checkFn, callback, interval = 300, timeout = 1800000) => {
    const start = Date.now();
    const loop = setInterval(() => {
      const result = checkFn();
      if (result) {
        clearInterval(loop);
        callback(result);
      } else if (Date.now() - start > timeout) {
        clearInterval(loop);
        console.warn("⏱ Timeout: Element not found");
      }
    }, interval);
  };

  waitFor(
    () => [...document.querySelectorAll("button")].find(
      btn => btn.innerText.trim() === "Register" && !btn.disabled
    ),
    (registerBtn) => {
      registerBtn.click();
      console.log("✅ Clicked Register");

      waitFor(
        () => [...document.querySelectorAll(".branch-item")].find(
          el => el.innerText.includes(targetBranch) && !el.classList.contains("full")
        ),
        (branchEl) => {
          branchEl.click();
          console.log("🏢 Selected branch:", targetBranch);

          waitFor(
            () => [...document.querySelectorAll("button, div, span")].find(
              el => el.innerText.trim().toLowerCase() === "next" &&
                    !el.disabled &&
                    !el.classList.contains("disabled") &&
                    getComputedStyle(el).pointerEvents !== "none"
            ),
            (nextBtn) => {
              nextBtn.click();
              console.log("➡️ Clicked Next");

              const day = new Date(targetDate).getDate().toString();

              waitFor(
                () => {
                  const byId = document.getElementById(`day${day}`);
                  if (byId) return byId;
                  return [...document.querySelectorAll(".calendar-cell, .day-selectable")]
                    .find(el => el.innerText.trim() === day && !el.classList.contains("day-selected"));
                },
                (dayEl) => {
                  dayEl.click();
                  console.log("📅 Selected day:", day);

                  waitFor(
                    () => [...document.querySelectorAll(".time-btn")].find(
                      btn => btn.innerText.trim() === targetTime && !btn.disabled
                    ),
                    (timeBtn) => {
                      setTimeout(() => {
                        timeBtn.click();
                        console.log("🕒 Selected time:", targetTime);

                        waitFor(
                          () => {
                            const confirmBtn = document.getElementById("confirmTime");
                            return confirmBtn && getComputedStyle(confirmBtn).display !== "none";
                          },
                          (confirmBtn) => {
                            confirmBtn.click();
                            console.log("✅ Clicked Confirm button");
                          },
                          300,
                          60000
                        );
                      }, 300);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}, 1000);

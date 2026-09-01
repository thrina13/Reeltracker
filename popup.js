const DAILY_GOAL = 50;

const reelsElement =
  document.getElementById("reelsWatched");

const timeElement =
  document.getElementById("timeSpent");

const averageElement =
  document.getElementById("averageTime");

const sessionsElement =
  document.getElementById("sessions");

const progressElement =
  document.getElementById("progress");

const goalElement =
  document.getElementById("goalText");

const percentageElement =
  document.getElementById("percentage");

const insightElement =
  document.getElementById("insightText");

function formatTime(seconds) {
  seconds = Math.max(0, Math.round(seconds || 0));

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

function updateDashboard() {

  chrome.storage.local.get(
    [
      "reelsWatched",
      "totalSeconds",
      "sessions"
    ],
    (data) => {

      const reels =
        Number(data.reelsWatched) || 0;

      const seconds =
        Number(data.totalSeconds) || 0;

      const sessions =
        Number(data.sessions) || 0;


      // Main number
      reelsElement.textContent = reels;


      // Time
      timeElement.textContent =
        formatTime(seconds);


      // Average
      const average =
        reels > 0
          ? Math.round(seconds / reels)
          : 0;

      averageElement.textContent =
        formatTime(average);


      // Sessions
      sessionsElement.textContent =
        sessions;


      // Goal
      const percentage =
        Math.min(
          100,
          Math.round((reels / DAILY_GOAL) * 100)
        );

      progressElement.style.width =
        `${percentage}%`;

      goalElement.textContent =
        `${reels} / ${DAILY_GOAL}`;

      percentageElement.textContent =
        `${percentage}%`;


      // Insight
      if (reels === 0) {

        insightElement.textContent =
          "Start watching Reels and I'll find your pattern.";

      } else if (reels < 10) {

        insightElement.textContent =
          "You're keeping today's scrolling relatively light.";

      } else if (reels < 25) {

        insightElement.textContent =
          "Your scrolling is starting to add up. Keep an eye on your sessions.";

      } else if (reels < DAILY_GOAL) {

        insightElement.textContent =
          `You've used ${percentage}% of today's goal. Your next scroll is worth noticing.`;

      } else {

        insightElement.textContent =
          "You've crossed your daily goal. Maybe give your attention a break.";
      }
    }
  );
}


// Initial load
updateDashboard();


// Refresh while popup is open
setInterval(updateDashboard, 2000);


// Reset today's data
document
  .getElementById("resetButton")
  .addEventListener("click", () => {

    const confirmed =
      confirm("Reset today's ReelTrack data?");

    if (!confirmed) return;

    chrome.storage.local.set({
      reelsWatched: 0,
      totalSeconds: 0,
      sessions: 0
    }, () => {

      updateDashboard();

    });
  });
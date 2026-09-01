let currentReel = null;
let reelStartTime = null;
let sessionStarted = false;

function isReelsPage() {
  return window.location.pathname.startsWith("/reels/");
}

function getCurrentReelId() {
  const match = window.location.pathname.match(/\/reels\/([^/]+)/);
  return match ? match[1] : null;
}

function startSession() {
  if (!sessionStarted) {
    sessionStarted = true;

    chrome.runtime.sendMessage({
      type: "NEW_SESSION"
    });

    console.log("ReelTrack → Session started");
  }
}

function finishCurrentReel() {
  if (!reelStartTime) return;

  const seconds = Math.round(
    (Date.now() - reelStartTime) / 1000
  );

  if (seconds > 0 && seconds < 3600) {
    chrome.runtime.sendMessage({
      type: "REEL_TIME",
      seconds: seconds
    });

    console.log(`ReelTrack → Time spent: ${seconds}s`);
  }

  reelStartTime = null;
}

function checkReel() {
  if (!isReelsPage()) {
    finishCurrentReel();

    currentReel = null;
    sessionStarted = false;

    return;
  }

  const reelId = getCurrentReelId();

  if (!reelId) return;

  startSession();

  if (reelId !== currentReel) {

    // Finish previous Reel
    finishCurrentReel();

    // Start new Reel
    currentReel = reelId;
    reelStartTime = Date.now();

    chrome.runtime.sendMessage(
      {
        type: "REEL_WATCHED"
      },
      (response) => {
        if (chrome.runtime.lastError) return;

        if (response) {
          console.log(
            "ReelTrack → Reel counted →",
            response.count
          );
        }
      }
    );
  }
}

setInterval(checkReel, 1000);

checkReel();

window.addEventListener("beforeunload", () => {
  finishCurrentReel();
});
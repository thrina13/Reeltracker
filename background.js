const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

chrome.runtime.onInstalled.addListener(async () => {
  const today = getToday();

  await chrome.storage.local.set({
    today,
    reelsWatched: 0,
    totalSeconds: 0,
    sessions: 0,
    lastActivity: Date.now()
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "REEL_WATCHED") {
    updateReelCount().then((count) => {
      sendResponse({ count });
    });

    return true;
  }

  if (message.type === "REEL_TIME") {
    updateTime(message.seconds);
  }

  if (message.type === "NEW_SESSION") {
    updateSession();
  }
});

async function checkNewDay() {
  const data = await chrome.storage.local.get(["today"]);
  const today = getToday();

  if (data.today !== today) {
    await chrome.storage.local.set({
      today,
      reelsWatched: 0,
      totalSeconds: 0,
      sessions: 0,
      lastActivity: Date.now()
    });
  }
}

async function updateReelCount() {
  await checkNewDay();

  const data = await chrome.storage.local.get([
    "reelsWatched"
  ]);

  const count = (data.reelsWatched || 0) + 1;

  await chrome.storage.local.set({
    reelsWatched: count,
    lastActivity: Date.now()
  });

  console.log("ReelTrack → Total reels:", count);

  return count;
}

async function updateTime(seconds) {
  await checkNewDay();

  const data = await chrome.storage.local.get([
    "totalSeconds"
  ]);

  const total =
    (data.totalSeconds || 0) + seconds;

  await chrome.storage.local.set({
    totalSeconds: total,
    lastActivity: Date.now()
  });
}

async function updateSession() {
  await checkNewDay();

  const data = await chrome.storage.local.get([
    "sessions"
  ]);

  const sessions =
    (data.sessions || 0) + 1;

  await chrome.storage.local.set({
    sessions,
    lastActivity: Date.now()
  });

  console.log(
    "ReelTrack → New session:",
    sessions
  );
}
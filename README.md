# ReelTrack 📱

> A personal Chrome extension that tracks how many Instagram Reels I watch and how much time I spend scrolling.

## Why I built this

I noticed how easy it is to open Instagram for a few minutes and suddenly realize I've been scrolling for much longer.

I wanted to see my own short-form content consumption instead of just guessing how much time I was spending on Reels.

So I built ReelTrack as a small personal experiment.

## What it does

ReelTrack runs in Chrome while I browse Instagram Reels and tracks:

- 🎬 Reels watched
- ⏱️ Time spent watching
- 📊 Average time per Reel
- 🔄 Number of scrolling sessions
- 🎯 Daily Reel goal
- 🧠 A simple attention insight based on daily usage

The extension displays these statistics through a lightweight popup dashboard.

## How it works

```text
Instagram Reels
       ↓
Chrome Content Script
       ↓
Detect Reel changes
       ↓
Track viewing time
       ↓
Chrome Storage API
       ↓
ReelTrack Dashboard


Installation
Clone this repository.
Open Chrome and go to chrome://extensions.
Enable Developer mode.
Click Load unpacked.
Select the Reeltracker folder.
Open Instagram and go to Reels.
Start scrolling.
Privacy

This is a personal browser-side project.

No Instagram password is required.
No login information is collected.
No likes, comments, follows, posts, or messages are automated.
Tracking data is stored locally using Chrome storage.
The Instagram API is not used.
Limitation

ReelTrack does not receive an official Reel-watch count from Instagram.

Instead, it estimates Reel consumption by detecting Reel/page changes in the browser. Since Instagram is a dynamic website, tracking accuracy may change if Instagram changes its page structure or navigation.

Current Status
MVP Complete ✅
 Reel detection
 Reel counting
 Session tracking
 Viewing-time tracking
 Local data storage
 Popup dashboard
 Daily goal
 Usage insight
Future Improvements
Weekly usage history
Interactive charts
Hour-by-hour usage patterns
Custom daily goals
Better session detection
More detailed insights
Data export
What I learned

The challenging part was working with Instagram's dynamic page behavior.

Instagram doesn't always reload the page when moving between Reels, so the extension needs to continuously check the current page and detect when the Reel changes.

<img width="953" height="440" alt="Screenshot 2026-09-01 182444" src="https://github.com/user-attachments/assets/a179337e-46ad-48b0-999d-95aa6b3302c6" />


Building this project helped me understand Chrome content scripts, service workers, browser storage, and working with dynamic websites

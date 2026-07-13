// import { SEARCHES } from "../config/searches.js";

// export async function runSearches() {
//   console.log("🚀 Starting Automatic Search Runner");

//   for (const search of SEARCHES) {

//     console.log(
//       `🌐 Opening ${search.source}: ${search.role}`
//     );

//     chrome.tabs.create({
//       url: search.url,
//       active: false,
//     });
//   }
// }

import { SEARCHES } from "../config/searches.js";

let queue = [];
let currentIndex = 0;
let currentTabId = null;
let isRunning = false;

// export function startSearchQueue() {
//   console.log("🚀 Starting Search Queue");

//   queue = [...SEARCHES];
//   currentIndex = 0;

//   openNextSearch();
// }

export function startSearchQueue() {
  if (isRunning) {
    console.log("⏳ Search Queue already running");
    return;
  }

  isRunning = true;

  console.log("🚀 Starting Search Queue");

  queue = [...SEARCHES];
  currentIndex = 0;

  openNextSearch();
}

function openNextSearch() {
//   if (currentIndex >= queue.length) {
//     console.log("🎉 Search Queue Finished");
//     return;
//   }
 if (currentIndex >= queue.length) {
    console.log("🎉 Search Queue Finished");

    isRunning = false;

    console.log("🔓 Search Queue Unlocked");

    return;
  }

  const search = queue[currentIndex];

  console.log(`🌐 Opening ${search.source}: ${search.role}`);

  chrome.tabs.create(
    {
      url: search.url,
      active: false,
    },
    (tab) => {
      currentTabId = tab.id;
    }
  );
}

// export function finishCurrentSearch() {
//   if (currentTabId) {
//     chrome.tabs.remove(currentTabId);
//   }

//   currentIndex++;

//   currentTabId = null;

//   openNextSearch();
// }

export function finishCurrentSearch() {
  if (currentTabId) {
    chrome.tabs.remove(currentTabId);
  }

  currentIndex++;

  currentTabId = null;

  // Queue finished?
  if (currentIndex >= queue.length) {
    openNextSearch(); // This prints "Queue Finished"

    return true;
  }

  openNextSearch();

  return false;
}
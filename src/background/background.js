// console.log("🚀 Attention Needed V2 Started");

import { filterJobs } from "../shared/filter-engine.js";
import { addUniqueJobs } from "../shared/deduplication-engine.js";
// import { saveCollectionRun } from "./repository/collection-run-repository.js";
import { saveCollectionRun } from "../repository/collection-run-repository.js"
// import { runSearches } from "../automation/search-runner.js";
// import {
//   startSearchQueue,
//   finishCurrentSearch,
// } from "../automation/search-runner.js";

import { startScheduler, registerScheduler } from "../automation/scheduler.js";

import {
  startSearchQueue,
  finishCurrentSearch,
  // } from "./automation/search-runner.js";
} from "../automation/search-runner.js";
// import { saveJobs } from "../repository/jobs-repository.js";
import { saveJobs } from "../repository/jobs-repository.js";

console.log("🚀 Attention Needed Background Started");

let runStats = {
  totalJobs: 0,
  matchedJobs: 0,
  newJobs: 0,
};

let runStartedAt = null;

// Comment below line for stop automatic running
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension Installed");

  startScheduler();

  runStartedAt = new Date();

  runStats = {
    totalJobs: 0,
    matchedJobs: 0,
    newJobs: 0,
  };

  startSearchQueue();
});

chrome.runtime.onStartup.addListener(() => {
  console.log("🚀 Chrome Started");

  startScheduler();

  runStartedAt = new Date();

  runStats = {
    totalJobs: 0,
    matchedJobs: 0,
    newJobs: 0,
  };

  startSearchQueue();
});

registerScheduler(() => {
  startSearchQueue();
});

// chrome.runtime.onMessage.addListener((message) => {
chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case "PAGE_INFO":
      console.log("================================");
      console.log("Source :", message.data.source);
      console.log("Title  :", message.data.title);
      console.log("URL    :", message.data.url);
      console.log("Time   :", message.data.timestamp);
      console.log("================================");
      break;

    // case "JOBS_COLLECTED": {
    //   console.log("📥 Jobs Received");

    //   console.log("🔍 Search Context");
    //   console.table(message.search);

    //   const filteredJobs = filterJobs(message.jobs);

    //   console.log(
    //     `✅ ${filteredJobs.length} of ${message.jobs.length} jobs matched`,
    //   );

    //   const { newJobs, totalJobs } = addUniqueJobs(filteredJobs);

    //   await saveJobs(newJobs, message.search);

    //   console.log(`🆕 ${newJobs.length} new jobs added`);

    //   console.log(`🌍 Global Pool: ${totalJobs.length} unique jobs`);

    //   console.table(totalJobs);

    //   break;
    // }

    case "JOBS_COLLECTED": {
      console.log("📥 Jobs Received");

      console.log("🔍 Search Context");
      console.table(message.search);

      const filteredJobs = filterJobs(message.jobs);

      console.log(
        `✅ ${filteredJobs.length} of ${message.jobs.length} jobs matched`,
      );

      const { newJobs, totalJobs } = addUniqueJobs(filteredJobs);

      runStats.totalJobs += message.jobs.length;
      runStats.matchedJobs += filteredJobs.length;
      runStats.newJobs += newJobs.length;

      await saveJobs(newJobs, message.search);

      console.log(`🆕 ${newJobs.length} new jobs added`);

      console.log(`🌍 Global Pool: ${totalJobs.length} unique jobs`);

      console.table(totalJobs);

      break;
    }

    // case "COLLECTION_FINISHED":
    //   console.log(`✅ ${message.source} collection finished`);

    //   finishCurrentSearch();

    //   break;

    case "COLLECTION_FINISHED": {
  console.log(`✅ ${message.source} collection finished`);

  const queueFinished = finishCurrentSearch();

  if (queueFinished) {
    console.log("📊 Saving Collection Run...");

    await saveCollectionRun({
      started_at: runStartedAt.toISOString(),
      finished_at: new Date().toISOString(),
      source_count: 2,
      total_jobs: runStats.totalJobs,
      matched_jobs: runStats.matchedJobs,
      new_jobs: runStats.newJobs,
      status: "SUCCESS",
    });
  }

  break;
}

    default:
      console.log("Unknown message:", message.type);
  }
});

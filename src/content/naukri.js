console.log("✅ Naukri Collector Loading");
import { createJobKey } from "../shared/job-normalizer.js";

function extractJob(card) {
  const title =
    card.querySelector('a[class*="JobTuple_anchor"]')?.textContent.trim() || "";

  const company =
    card
      .querySelector('span[class*="JobTuple_comp-name"]')
      ?.textContent.trim() || "";

  const location =
    card
      .querySelector('img[alt="location"]')
      ?.nextElementSibling?.textContent.trim() || "";

  const url = card.querySelector('a[class*="JobTuple_anchor"]')?.href || "";

  return {
    source: "naukri",
    title,
    company,
    location,
    url,
  };
}

function collectJobs() {
  const cards = document.querySelectorAll("[data-job-id]");
  console.log("Cards immediately:", cards.length);
  // const cards = document.querySelectorAll("[data-job-id]");

  if (cards.length === 0) {
    console.log("❌ No job cards found");
    return;
  }

  console.log(`📋 Found ${cards.length} job cards`);

  const jobs = [];

  cards.forEach((card, index) => {
    const job = extractJob(card);

    job.job_key = createJobKey(job);

    jobs.push(job);

    console.log(`Job ${index + 1}:`, job);
  });

  console.log("Jobs Array:", jobs);
  console.log("Total Jobs:", jobs.length);

  sendJobs(jobs);
}

function getSearchContext() {
  const params = new URLSearchParams(window.location.search);

  let role = params.get("q") || "";
  let searchLocation = params.get("location") || "";

  // Fallback to URL path
  if (!role || !searchLocation) {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("react-developer")) {
      role = "React Developer";
    }

    if (path.includes("hyderabad")) {
      searchLocation = "Hyderabad";
    }
  }

  return {
    role,
    location: searchLocation,
  };
}

function sendJobs(jobs) {
  try {
    chrome.runtime.sendMessage({
      type: "JOBS_COLLECTED",
      source: "naukri",
      search: getSearchContext(),
      jobs,
    });

    chrome.runtime.sendMessage({
      type: "COLLECTION_FINISHED",
      source: "naukri",
    });
    console.log(`📤 Sent ${jobs.length} jobs to background`);
  } catch (err) {
    console.error("❌ SendMessage Error:", err);
  }
}

function waitForJobs() {
  const interval = setInterval(() => {
    const count = document.querySelectorAll("[data-job-id]").length;

    console.log(`⏳ Waiting for jobs... (${count})`);

    if (count > 0) {
      clearInterval(interval);

      console.log(`✅ Found ${count} jobs`);

      collectJobs();
    }
  }, 300);
}

// function waitForJobs() {
//   console.log("👀 Watching for Naukri jobs...");

//   const observer = new MutationObserver(() => {
//     const cards = document.querySelectorAll("[data-job-id]");

//     console.log(`Observed cards: ${cards.length}`);

//     if (cards.length > 0) {
//       observer.disconnect();

//       console.log("✅ Jobs appeared!");

//       collectJobs();
//     }
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });

//   // Safety timeout
//   setTimeout(() => {
//     observer.disconnect();
//     console.log("⌛ Observer timed out after 20 seconds");
//   }, 20000);
// }

function init() {
  console.log("🚀 Starting Naukri Collector...");

  waitForJobs();
}

init();

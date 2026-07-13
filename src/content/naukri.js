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

// function getSearchContext() {
//   const params = new URLSearchParams(location.search);

//   return {
//     role: params.get("q") || "",
//     location: params.get("location") || "",
//   };
// }

// function getSearchContext() {
//   const params = new URLSearchParams(location.search);

//   let role = params.get("q") || "";
//   let location = params.get("location") || "";

//   // Fallback to URL path
//   if (!role || !location) {
//     const path = location.pathname.toLowerCase();

//     if (path.includes("react-developer")) {
//       role = "React Developer";
//     }

//     if (path.includes("hyderabad")) {
//       location = "Hyderabad";
//     }
//   }

//   return {
//     role,
//     location,
//   };
// }

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

function init() {
  console.log("🚀 Starting Naukri Collector...");

  waitForJobs();
}

init();

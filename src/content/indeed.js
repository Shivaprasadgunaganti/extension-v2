console.log("✅ Indeed Collector Loading");
import { createJobKey } from "../shared/job-normalizer.js";

function extractJob(card) {
  const titleElement =
    card.querySelector("h3.jobTitle span[title]") ||
    card.querySelector("h3.jobTitle a") ||
    card.querySelector("h3.jobTitle");

  const title = titleElement?.textContent.trim() || "";

  const company =
    card.querySelector('[data-testid="company-name"]')?.textContent.trim() ||
    "";

  const location =
    card.querySelector('[data-testid="text-location"]')?.textContent.trim() ||
    "";

  const href = card.querySelector("h3.jobTitle a")?.getAttribute("href") || "";

  const url = href ? new URL(href, window.location.origin).href : "";

  // return {
  //   source: "indeed",
  //   title,
  //   company,
  //   location,
  //   url,
  // };
  return {
  title,
  company,
  location,
  url,
  role,
  search_location
}
}

function collectJobs() {
  const cards = document.querySelectorAll(".job_seen_beacon");

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
  return {
    role: document.querySelector('input[name="q"]')?.value.trim() || "",

    location: document.querySelector('input[name="l"]')?.value.trim() || "",
  };
}

function sendJobs(jobs) {
  try {
    // Send the collected jobs
    chrome.runtime.sendMessage({
      type: "JOBS_COLLECTED",
      source: "indeed",
      search: getSearchContext(),
      jobs,
    });

    // Notify that collection is complete
    chrome.runtime.sendMessage({
      type: "COLLECTION_FINISHED",
      source: "indeed",
    });

    console.log(`📤 Sent ${jobs.length} jobs to background`);
  } catch (err) {
    console.error("❌ SendMessage Error:", err);
  }
}

function init() {
  console.log("🚀 Starting Indeed Collector...");

  collectJobs();
}
// collectJobs();
init();

// import { createJobKey } from "./job-normalizer.js";
import { createJobKey } from "./job-normalizer.js";

const seenJobs = new Map();

export function addUniqueJobs(jobs) {
  const newlyAdded = [];

  for (const job of jobs) {
    const key = createJobKey(job);

    if (!seenJobs.has(key)) {
      seenJobs.set(key, job);
      newlyAdded.push(job);
    }
  }

  return {
    newJobs: newlyAdded,
    totalJobs: [...seenJobs.values()]
  };
}

export function getGlobalJobs() {
  return [...seenJobs.values()];
}

export function clearGlobalJobs() {
  seenJobs.clear();
}
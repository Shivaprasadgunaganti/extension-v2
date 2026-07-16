import { createJobKey } from "./job-normalizer.js";

const seenJobs = new Map();

export function addUniqueJobs(jobs) {
  console.log("DEDUP INPUT:", jobs.length);

  const newlyAdded = [];

  for (const job of jobs) {
    const key = createJobKey(job);

    if (!seenJobs.has(key)) {
      console.log("ADDING:", key);
      seenJobs.set(key, job);
      newlyAdded.push(job);
    } else {
      console.log("DUPLICATE:", key);
    }
  }

  console.log("MAP SIZE:", seenJobs.size);

  return {
    newJobs: newlyAdded,
    totalJobs: [...seenJobs.values()],
  };
}

export function getGlobalJobs() {
  return [...seenJobs.values()];
}

export function clearGlobalJobs() {
  seenJobs.clear();
}

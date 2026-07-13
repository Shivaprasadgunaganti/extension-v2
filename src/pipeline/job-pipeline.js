import { filterJobs } from "../shared/filter-engine.js";
import { addUniqueJobs } from "../shared/deduplication-engine.js";
import { saveJobs } from "../repository/jobs-repository.js";

export function processJobs(jobs, search) {
  console.log("⚙️ Job Pipeline Started");

  console.log("📋 Raw Jobs");
console.table(jobs);

  const filteredJobs = filterJobs(jobs);

  console.log(
    `✅ ${filteredJobs.length} of ${jobs.length} jobs matched`
  );

  const { newJobs, totalJobs } = addUniqueJobs(filteredJobs);

  console.log(`🆕 ${newJobs.length} new jobs added`);

  console.log(`🌍 ${totalJobs.length} unique jobs in pool`);

  saveJobs(newJobs);

  return totalJobs;
}
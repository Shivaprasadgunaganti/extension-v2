import { filterJobs } from "../shared/filter-engine.js";
import { addUniqueJobs } from "../shared/deduplication-engine.js";
import { saveJobs } from "../repository/jobs-repository.js";

export function processJobs(jobs, search) {
  const filteredJobs = filterJobs(jobs);

  const { newJobs, totalJobs } = addUniqueJobs(filteredJobs);

  saveJobs(newJobs);

  return totalJobs;
}

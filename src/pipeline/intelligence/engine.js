// import { extractSkills } from "./extractor.js";
// import { calculateScore } from "./scorer.js";

// export function analyzeJob(job) {
//   const extractedSkills = extractSkills(job);

//   return calculateScore(job, extractedSkills);
// }


import { extractSkills } from "./extractor.js";
import { calculateScore } from "./scorer.js";

export function analyzeJob(job) {
  console.log("1. Before extractSkills");

  const extractedSkills = extractSkills(job);

  console.log("2. After extractSkills", extractedSkills);

  console.log("3. Before calculateScore");

  const result = calculateScore(job, extractedSkills);

  console.log("4. After calculateScore", result);

  return result;
}
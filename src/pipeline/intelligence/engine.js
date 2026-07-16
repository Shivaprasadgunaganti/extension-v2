

import { extractSkills } from "./extractor.js";
import { calculateScore } from "./scorer.js";

export function analyzeJob(job) {
  const extractedSkills = extractSkills(job);

  return calculateScore(job, extractedSkills);
}
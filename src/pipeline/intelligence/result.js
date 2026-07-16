export function createAnalysisResult({
  score,
  breakdown,
  extractedSkills,
  matchedSkills,
  missingSkills,
  priority,
}) {
  return {
    score,
    breakdown,
    extractedSkills,
    matchedSkills,
    missingSkills,
    priority,
  };
}
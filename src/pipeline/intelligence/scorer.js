import { profile } from "./profile.js";
import { PRIORITY, WEIGHTS } from "./constants.js";
import { createAnalysisResult } from "./result.js";

function percentage(matched, total) {
  if (total === 0) return 0;

  return Math.round((matched / total) * 100);
}

export function calculateScore(job, extractedSkills) {
  let roleMatched = false;
  let locationMatched = false;

  //   let matchedPrimary = 0;
  //   let matchedSecondary = 0;

  let matchedPrimaryWeight = 0;
  let matchedSecondaryWeight = 0;

  const totalPrimaryWeight = profile.primarySkills.reduce(
    (sum, skill) => sum + skill.weight,
    0,
  );

  const totalSecondaryWeight = profile.secondarySkills.reduce(
    (sum, skill) => sum + skill.weight,
    0,
  );

  const matchedSkills = [];
  const missingSkills = [];

  // -------------------------
  // Role Matching
  // -------------------------

  const title = (job.title || "").toLowerCase();

  for (const role of profile.preferredRoles) {
    const matched = role.aliases.some((alias) =>
      title.includes(alias.toLowerCase()),
    );

    if (matched) {
      roleMatched = true;
      break;
    }
  }

  // -------------------------
  // Location Matching
  // -------------------------

  const location = (job.location || "").toLowerCase();

  for (const preferred of profile.preferredLocations) {
    if (location.includes(preferred.value.toLowerCase())) {
      locationMatched = true;
      break;
    }
  }

  // -------------------------
  // Primary Skills
  // -------------------------

  for (const skill of profile.primarySkills) {
    if (extractedSkills.includes(skill.value)) {
      //   matchedPrimary++;
      //   matchedSkills.push(skill.value);
      matchedPrimaryWeight += skill.weight;
      matchedSkills.push(skill.value);
    } else {
      missingSkills.push(skill.value);
    }
  }

  // -------------------------
  // Secondary Skills
  // -------------------------

  for (const skill of profile.secondarySkills) {
    if (extractedSkills.includes(skill.value)) {
      //   matchedSecondary++;
      matchedSecondaryWeight += skill.weight;
      matchedSkills.push(skill.value);
    }
  }

  // -------------------------
  // Percentages
  // -------------------------

  const rolePercentage = roleMatched ? 100 : 0;

  const locationPercentage = locationMatched ? 100 : 0;

  //   const primaryPercentage = percentage(
  //     matchedPrimary,
  //     profile.primarySkills.length,
  //   );

  //   const secondaryPercentage = percentage(
  //     matchedSecondary,
  //     profile.secondarySkills.length,
  //   );

  const primaryPercentage = percentage(
    matchedPrimaryWeight,
    totalPrimaryWeight,
  );

  const secondaryPercentage = percentage(
    matchedSecondaryWeight,
    totalSecondaryWeight,
  );

  // -------------------------
  // Final Score
  // -------------------------

  const score = Math.round(
    rolePercentage * WEIGHTS.ROLE +
      locationPercentage * WEIGHTS.LOCATION +
      primaryPercentage * WEIGHTS.PRIMARY_SKILLS +
      secondaryPercentage * WEIGHTS.SECONDARY_SKILLS,
  );

  // -------------------------
  // Priority
  // -------------------------

  let priority = PRIORITY.LOW;

  if (score >= 80) {
    priority = PRIORITY.HIGH;
  } else if (score >= 60) {
    priority = PRIORITY.MEDIUM;
  }

  return {
    score,

    breakdown: {
      role: rolePercentage,
      location: locationPercentage,
      primarySkills: primaryPercentage,
      secondarySkills: secondaryPercentage,
    },

    extractedSkills,

    matchedSkills,

    missingSkills,

    priority,
  };
}

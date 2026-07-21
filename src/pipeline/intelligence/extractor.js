import { skills } from "./skills.js";

export function extractSkills(job) {
  const text = [job.title, job.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const extracted = new Set();

  for (const skill of skills) {
    for (const alias of skill.aliases) {
      if (text.includes(alias.toLowerCase())) {
        extracted.add(skill.name);
        break;
      }
    }
  }

  return [...extracted];  
}

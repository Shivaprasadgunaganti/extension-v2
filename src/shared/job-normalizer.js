// Normalize text

export function normalizeText(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

// Normalize job title

export function normalizeTitle(title = "") {
  return normalizeText(title)
    .replace(/front[\s-]?end/g, "frontend")
    .replace(/react\.?js/g, "react")
    .replace(/\(.*?\)/g, "") // remove text inside ()
    .trim();
}

// Normalize company

export function normalizeCompany(company = "") {
  return normalizeText(company)
    .replace(/\b(private|pvt|pvt\.|ltd|ltd\.|limited|inc|inc\.|llp)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Normalize location

export function normalizeLocation(location = "") {
  return normalizeText(location)
    .replace("remote in hyderabad, telangana", "hyderabad")
    .replace("hyderabad, telangana", "hyderabad")
    .replace("hyderabad,", "hyderabad")
    .trim();
}

// Create comparison key

export function createJobKey(job) {
  return [
    normalizeTitle(job.title),
    normalizeCompany(job.company),
    normalizeLocation(job.location)
  ].join("|");
}
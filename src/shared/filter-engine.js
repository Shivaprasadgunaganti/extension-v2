// User Preferences

// const FILTERS = {
//   roles: [
//     "react developer",
//     "frontend developer",
//     "front end developer",
//     "web developer"
//   ],

//   locations: [
//     "hyderabad"
//   ],

//   maxExperience: 2,

//   freshness: [
//     "today",
//     "1 day ago",
//     "24 hours",
//     "last 24 hours"
//   ]
// };

const FILTERS = {
  keywords: [
    "react",
    "frontend",
    "front end",
    "next.js",
    "web developer"
  ],

  locations: [
    "hyderabad"
  ]
};



import {
  normalizeTitle,
  normalizeLocation
// } from "./shared/job-normalizer.js";
} from "../shared/job-normalizer.js";

export function filterJobs(jobs) {
  return jobs.filter(job => {

    const title = normalizeTitle(job.title);

    const location = normalizeLocation(job.location);

    const roleMatch = FILTERS.keywords.some(keyword =>
      title.includes(keyword)
    );

    const locationMatch = FILTERS.locations.some(city =>
      location.includes(city)
    );

    return roleMatch && locationMatch;
  });
}
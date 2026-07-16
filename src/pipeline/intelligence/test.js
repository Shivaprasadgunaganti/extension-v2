
// import { extractSkills } from "./extractor.js";

// const job = {
//   title: "ReactJS Frontend Engineer",

//   description: `
// We are looking for a Frontend Engineer with
// React.js, JS, Redux Toolkit,
// RESTful APIs, GitHub,
// NextJS and Docker experience.

// Knowledge of HTML5, CSS3 and NodeJS is preferred.
// `,
// };

// console.log("Extracted Skills:");
// console.log(extractSkills(job));

import { analyzeJob } from "./engine.js";

const job = {
  title: "ReactJS Frontend Engineer",

  location: "Hyderabad",

  description: `
Looking for React.js, JavaScript,
Redux Toolkit,
RESTful APIs,
GitHub,
NextJS,
Docker,
HTML5,
CSS3,
NodeJS.
`,
};

console.log(analyzeJob(job));
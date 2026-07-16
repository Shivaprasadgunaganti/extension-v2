export const profile = {
  //   preferredRoles: [
  //     { value: "React Developer", weight: 30 },
  //     { value: "Frontend Developer", weight: 30 },
  //     { value: "JavaScript Developer", weight: 25 },
  //     { value: "MERN Developer", weight: 20 },
  //     { value: "Full Stack Developer", weight: 15 },
  //     { value: "Software Engineer", weight: 10 },
  //   ],

  preferredRoles: [
    {
      name: "React",
      weight: 30,

      aliases: [
        "React Developer",
        "React Engineer",
        "ReactJS Developer",
        "Frontend React Developer",
        "React Frontend Engineer",
        "React Front End Developer",
      ],
    },

    {
      name: "Frontend",
      weight: 30,

      aliases: [
        "Frontend Developer",
        "Frontend Engineer",
        "Front End Developer",
        "Front End Engineer",
        "UI Developer",
      ],
    },

    {
      name: "JavaScript",
      weight: 25,

      aliases: ["JavaScript Developer", "JavaScript Engineer"],
    },

    {
      name: "Full Stack",
      weight: 20,

      aliases: [
        "Full Stack Developer",
        "Full Stack Engineer",
        "MERN Developer",
      ],
    },
  ],
  preferredLocations: [
    { value: "Hyderabad", weight: 20 },
    { value: "Remote", weight: 20 },
  ],

  primarySkills: [
    { value: "React", weight: 15 },
    { value: "JavaScript", weight: 15 },
    { value: "HTML", weight: 8 },
    { value: "CSS", weight: 8 },
    { value: "Bootstrap", weight: 6 },
    { value: "REST API", weight: 8 },
    { value: "Git", weight: 5 },
    { value: "GitHub", weight: 5 },
  ],

  secondarySkills: [
    { value: "Node.js", weight: 4 },
    { value: "Express", weight: 4 },
    { value: "MongoDB", weight: 4 },
    { value: "Supabase", weight: 3 },
  ],
};

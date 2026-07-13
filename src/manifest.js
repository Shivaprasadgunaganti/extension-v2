export default {
  manifest_version: 3,

  name: "Attention Needed",

  description: "Personal Job Opportunity Radar",

  version: "2.0.0",

  permissions: [
    "storage",
    "tabs",
    "alarms",
    "activeTab"
  ],

  host_permissions: [
    "https://*.indeed.com/*",
    "https://*.naukri.com/*"
  ],

  background: {
    service_worker: "src/background/background.js",
    type: "module"
  },

  content_scripts: [
    {
      matches: [
        "https://*.indeed.com/*"
      ],
      js: [
        "src/content/indeed.js"
      ]
    },
    {
      matches: [
        "https://*.naukri.com/*"
      ],
      js: [
        "src/content/naukri.js"
      ]
    }
  ],

  action: {
    default_title: "Attention Needed"
  }
};
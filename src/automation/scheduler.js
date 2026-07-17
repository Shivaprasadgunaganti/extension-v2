export function startScheduler() {
  chrome.alarms.create("jobCollector", {
    periodInMinutes: 60, // Development only
  });

  console.log("⏰ Scheduler Started");
}

export function registerScheduler(onRun) {
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name !== "jobCollector") return;

    console.log("⏰ Scheduled Collection Started");

    onRun();
  });
}

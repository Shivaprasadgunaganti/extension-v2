// export function saveJobs(jobs) {
//   console.log(`💾 Repository received ${jobs.length} jobs`);
//   return jobs;
// }

import { supabase } from "../supabase.js";

export async function saveJobs(jobs, search) {
  if (!jobs.length) return;

  const rows = jobs.map((job) => ({
    job_key: job.job_key,
    source: job.source,
    title: job.title,
    company: job.company,
    location: job.location,
    url: job.url,
    role: search.role,
    search_location: search.location,
    collected_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase.from("jobs").upsert(rows, {
    onConflict: "job_key",
  });

  //   if (error) {
  //     console.error("❌ Supabase Error", error);
  //     return;
  //   }

  if (error) {
    console.error("❌ Supabase Error");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    console.error("Details:", error.details);
    console.error("Hint:", error.hint);
    console.error(error);

    return;
  }

  console.log(`✅ Saved ${rows.length} jobs to Supabase`);
}

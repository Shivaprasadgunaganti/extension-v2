import { supabase } from "../supabase.js";

export async function saveJobs(jobs, search) {
  console.log("🔥 VERSION CHECK 123");

  try {
    console.log("Jobs:", jobs);
    console.log("Search:", search);

    if (!jobs.length) {
      console.log("No jobs");
      return;
    }

    console.log("Search received in saveJobs:");
    console.log(search);

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

    console.table(rows);

    // const rows = jobs.map((job) => ({
    //   job_key: job.job_key,
    //   source: job.source,
    //   title: job.title,
    //   company: job.company,
    //   location: job.location,
    //   url: job.url,

    //   role: search?.role ?? "",
    //   search_location: search?.location ?? "",

    //   collected_at: new Date().toISOString(),
    // }));

    // console.table(rows);

    
    const result = await supabase
      .from("jobs")
      .upsert(rows, { onConflict: "job_key" })
      .select();
  } catch (e) {
    console.error("SAVE JOBS ERROR");
    console.error(e);
    console.error(e.stack);
  }
}

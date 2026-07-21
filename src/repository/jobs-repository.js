import { supabase } from "../supabase.js";
import { analyzeJob } from "../pipeline/intelligence/engine.js";
import { APPLY_STATUS, APPLY_TYPE } from "../shared/application-constants.js";
import { APPLY_THRESHOLD } from "../pipeline/intelligence/constants.js";

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

    const rows = jobs.map((job) => {
      // console.log("Processing Job:", job);
      const analysis = analyzeJob(job);

      // console.log("================================");
      // console.log(job.title);
      // console.log("Score:", analysis.score);
      // console.log("Apply Status:", applyStatus);
      // console.log(analysis);

      const applyStatus =
        analysis.score >= APPLY_THRESHOLD
          ? APPLY_STATUS.READY
          : APPLY_STATUS.NOT_READY;

      // console.log("Apply Status:", applyStatus);

      console.log("Saving Row");

      return {
        job_key: job.job_key,

        source: job.source,

        title: job.title,

        company: job.company,

        location: job.location,

        url: job.url,

        role: search.role,

        search_location: search.location,

        collected_at: new Date().toISOString(),

        // Intelligence

        match_score: analysis.score,

        priority: analysis.priority,

        matched_skills: analysis.matchedSkills,

        missing_skills: analysis.missingSkills,

        extracted_skills: analysis.extractedSkills,

        score_breakdown: analysis.breakdown,

        apply_type: job.apply_type ?? APPLY_TYPE.UNKNOWN,
      };
    });

    console.table(rows);

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

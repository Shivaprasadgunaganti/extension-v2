import { supabase } from "../supabase.js";

export async function saveCollectionRun(run) {
  const { error } = await supabase
    .from("collection_runs")
    .insert(run);

//   if (error) {
//     console.error("❌ Collection Run Error", error);
//     return;
//   }

if (error) {
  console.error("❌ Collection Run Error");
  console.error("Code:", error.code);
  console.error("Message:", error.message);
  console.error("Details:", error.details);
  console.error("Hint:", error.hint);
  console.error(error);

  return;
}

  console.log("✅ Collection Run Saved");
}
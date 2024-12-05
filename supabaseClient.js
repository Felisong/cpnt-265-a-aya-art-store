import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabase = createClient(
  "https://vpwkscrmqjaxgpqivosg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwd2tzY3JtcWpheGdwcWl2b3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxOTEwODgsImV4cCI6MjA0ODc2NzA4OH0.3nDOvw3AoDIOgPvBEN8x8qTIgbgiU3SotKFscl2tX_Y"
);
const { data, error } = await supabase.from("countries").select();

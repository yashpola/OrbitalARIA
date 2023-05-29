import { createClient } from "@supabase/supabase-js";
import { projectUrl, APIKEY } from "./config";

export const supabase = createClient(projectUrl, APIKEY);

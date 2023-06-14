import { createClient } from "@supabase/supabase-js";

const projectURL = process.env.REACT_APP_PROJECT_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const supabase = createClient(projectURL, apiKey);

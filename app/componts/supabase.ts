// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://papofiykkrgflfrrzwle.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcG9maXlra3JnZmxmcnJ6d2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDUwMTMsImV4cCI6MjA3NTQyMTAxM30.9szKv_yzpZpZDH4XW41jAMsStGbt2rRIbqd9RCJYvuw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

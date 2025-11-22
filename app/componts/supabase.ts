// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Server-side factory (use in serverless functions / API routes)
export function getSupabase() {
	if (!SUPABASE_URL || !SUPABASE_KEY) {
		console.warn("Supabase credentials not found in environment variables.");
		return null;
	}
	return createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Client-side instance (used by client components). Uses NEXT_PUBLIC_* vars.
const PUB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUB_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const supabase = (typeof window !== "undefined" && PUB_URL && PUB_KEY)
	? createClient(PUB_URL, PUB_KEY)
	: ({} as any);

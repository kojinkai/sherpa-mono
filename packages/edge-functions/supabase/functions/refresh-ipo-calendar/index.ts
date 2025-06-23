// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const config = {
  finnHubURL: "https://finnhub.io/api/v1",
  finnHubToken: Deno.env.get("FINNHUB_API_TOKEN")!,
  supabaseUrl: Deno.env.get("SUPABASE_URL")!,
  supabaseAnonKey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
};

Deno.serve(async () => {
  const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

  if (!config.finnHubToken) {
    throw new Error("FINNHUB_API_TOKEN environment variable is not set");
  }

  const ipoResponse = await fetch(`${config.finnHubURL}/calendar/ipo`, {
    headers: {
      "X-Finnhub-Token": config.finnHubToken,
    },
  });

  const { ipoCalendar } = await ipoResponse.json();

  const { data, error } = await supabase
    .from("IPO")
    .upsert(ipoCalendar, {
      onConflict: "name",
    })
    .select("*");

  if (error) {
    console.log(`Some random error occurred ${error.message}`);
  }

  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { DefaultApi, ApiClient } from "npm:finnhub@1.2.19";

const config = {
  finnHubToken: Deno.env.get("FINNHUB_API_TOKEN")!,
  supabaseUrl: Deno.env.get("SUPABASE_URL")!,
  supabaseServiceKey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
};

Deno.serve(async (req) => {
  if (!config.finnHubToken) {
    throw new Error("FINNHUB_API_TOKEN environment variable is not set");
  }

  // Initialize Finnhub client following the documentation pattern
  // found here https://finnhub.io/docs/api/ipo-calendar
  const api_key = ApiClient.instance.authentications["api_key"];
  api_key.apiKey = config.finnHubToken;
  const finnhubClient = new DefaultApi();

  // Get current date for IPO calendar
  const today = new Date();
  const from = today.toISOString().split("T")[0]; // YYYY-MM-DD format

  // Set to date to 6 months in the future
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const to = sixMonthsFromNow.toISOString().split("T")[0]; // YYYY-MM-DD format

  try {
    // Call IPO Calendar API using the Finnhub client with callback pattern
    const { ipoCalendar } = await new Promise((resolve, reject) => {
      finnhubClient.ipoCalendar(
        from,
        to,
        (error: Error | null, data: unknown, _response: unknown) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });

    const supabase = createClient(
      config.supabaseUrl,
      config.supabaseServiceKey,
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    const { data, error } = await supabase
      .from("IPO")
      // .upsert(ipoCalendar, {
      //   onConflict: "name",
      // })
      .select("*");

    if (error) {
      throw error;
    }
    return new Response(JSON.stringify({ data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

    // if (error) {
    //   console.log(`Some random error occurred ${error.message}`);
    // }
  } catch (error) {
    console.error("Error fetching IPO calendar:", error);
    return new Response(JSON.stringify({ error }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});

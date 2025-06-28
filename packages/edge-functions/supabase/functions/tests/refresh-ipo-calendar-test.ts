// Import required libraries and modules
import { assert } from "jsr:@std/assert@1";
import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

// Will load the .env file to Deno.env
import "jsr:@std/dotenv/load";

// Mock fetch function for Finnhub API
const originalFetch = globalThis.fetch;
const mockFetch = (input: string | URL | Request, init?: RequestInit) => {
  const url = input.toString();

  // Mock Finnhub API response
  if (url.includes("finnhub.io")) {
    const mockResponse = {
      calendar: [
        {
          date: "2024-01-15",
          exchange: "NASDAQ",
          name: "Mock Company Inc",
          numberOfShares: 1000000,
          price: 25.0,
          status: "expected",
        },
      ],
    };

    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
      text: () => Promise.resolve(JSON.stringify(mockResponse)),
    } as Response);
  }

  // For other URLs, use the original fetch
  return originalFetch(input, init);
};

// Set up the configuration for the Supabase client
const supabaseUrl = Deno.env.get("TEST_SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("TEST_SUPABASE_ANON_KEY") ?? "";
const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

// Test the creation and functionality of the Supabase client
const testClientCreation = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options
  );

  // Verify if the Supabase URL and key are provided
  if (!supabaseUrl) throw new Error("supabaseUrl is required.");
  if (!supabaseKey) throw new Error("supabaseKey is required.");

  // Test a simple query to the database
  const { data: table_data, error: table_error } = await client
    .from("IPO")
    .select("*")
    .limit(1);
  if (table_error) {
    throw new Error("Invalid Supabase client: " + table_error.message);
  }
  assert(table_data, "Data should be returned from the query.");
};

// Test the refresh-ipo-calendar function with mocked Finnhub API
const testRefreshIpoCalendar = async () => {
  // Replace global fetch with mock
  globalThis.fetch = mockFetch;

  try {
    const client: SupabaseClient = createClient(
      supabaseUrl,
      supabaseKey,
      options
    );

    // Invoke the refresh-ipo-calendar function
    const { data: func_data, error: func_error } =
      await client.functions.invoke("refresh-ipo-calendar", {
        body: {},
      });

    // Check for errors from the function invocation
    if (func_error) {
      throw new Error("Invalid response: " + func_error.message);
    }

    // Assert that the function returned the expected result
    assert(func_data, "Function should return data");
  } finally {
    // Restore original fetch
    globalThis.fetch = originalFetch;
  }
};

// Register and run the tests
Deno.test("Client Creation Test", testClientCreation);
Deno.test("Refresh-ipo-calendar Function Test", testRefreshIpoCalendar);

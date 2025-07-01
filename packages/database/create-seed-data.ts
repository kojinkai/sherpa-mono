import { ApiClient, DefaultApi } from "finnhub";
import fs from "fs";
import path from "path";

// Example: export FINNHUB_API_KEY=your_actual_api_key_here
// Read Finnhub API key from environment
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
if (!FINNHUB_API_KEY) {
  throw new Error("FINNHUB_API_KEY is not set in environment variables");
}

// Set up Finnhub client (Node.js style)
const api_key = ApiClient.instance.authentications["api_key"];
api_key.apiKey = FINNHUB_API_KEY;
const finnhubClient = new DefaultApi();

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Date range
const startDate = new Date("2025-01-01");
// Set endDate to today
const endDate = new Date();

// Array to hold all IPO events
const allIpoEvents: any[] = [];

async function fetchIpoCalendarForDate(date: Date) {
  const from = formatDate(date);
  const to = formatDate(date);
  return new Promise<any[]>((resolve, reject) => {
    finnhubClient.ipoCalendar(from, to, (error: Error | null, data: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(data?.ipoCalendar || []);
      }
    });
  });
}

// Add a delay to respect API rate limits
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    try {
      const ipoEvents = await fetchIpoCalendarForDate(currentDate);
      if (ipoEvents.length > 0) {
        allIpoEvents.push(...ipoEvents);
        console.log(
          `Fetched ${ipoEvents.length} events for ${formatDate(currentDate)}`
        );
      } else {
        console.log(`No events for ${formatDate(currentDate)}`);
      }
    } catch (err) {
      console.error(`Error fetching for ${formatDate(currentDate)}:`, err);
    }
    // Increment by one day
    currentDate.setDate(currentDate.getDate() + 1);
    // Wait 35ms to ensure we do not exceed 30 calls/sec
    await delay(1000);
  }

  // Write results to a file
  const outputPath = path.join(__dirname, "ipo-seed-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(allIpoEvents, null, 2));
  console.log(`Saved ${allIpoEvents.length} IPO events to ${outputPath}`);
})();

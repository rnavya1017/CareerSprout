import { NextResponse } from "next/server";
import axios from "axios";

const ADZUNA_APP_ID = "5c14d687";
const ADZUNA_API_KEY = "f309734d4660177b880359fc6b8a31c8";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const what = searchParams.get("what") || "software engineer";
  const where = searchParams.get("where") || "india";
  const category = searchParams.get("category") || "";

  try {
    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/1`,
      {
        params: {
          app_id: ADZUNA_APP_ID,
          app_key: ADZUNA_API_KEY,
          what: what,
          where: where,
          content_type: "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Adzuna API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

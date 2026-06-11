import { NextResponse } from "next/server";

export async function GET() {
  try {
    const key = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${key}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("NASA APOD fetch failed");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch APOD" },
      { status: 500 }
    );
  }
}

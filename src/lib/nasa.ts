export interface APODData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl: string;
  media_type: "image" | "video";
}

export interface JWSTImage {
  nasa_id: string;
  title: string;
  description: string;
  date_created: string;
  href: string;
}

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

// ─── APOD ─────────────────────────────────────────────────────────────────────

export async function getAPOD(): Promise<APODData | null> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title,
      date: data.date,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl,
      media_type: data.media_type,
    };
  } catch {
    return null;
  }
}

// ─── JWST Images ──────────────────────────────────────────────────────────────

export async function getJWSTImages(keyword?: string): Promise<JWSTImage[]> {
  try {
    const q = keyword || "james webb";
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const collection = data.collection?.items || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return collection.slice(0, 20).map((item: any) => ({
      nasa_id: item.nasa_id,
      title: item.meta?.title || "",
      description: item.meta?.description || "",
      date_created: item.meta?.date_created || "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      href: item.links?.find((l: any) => l.category === "image")?.href
        || item.links?.[0]?.href
        || "",
    }));
  } catch {
    return [];
  }
}

// ─── Mars Weather ─────────────────────────────────────────────────────────────

export async function getMarsWeather(): Promise<string> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/insight_weather/?api_key=${NASA_KEY}&feedtype=json&ver=1.0`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return "No data";
    const data = await res.json();
    const solKeys = Object.keys(data);
    if (!solKeys.length) return "No data";
    const sol = data[solKeys[0]];
    const at = sol.AT?.at || null;
    if (!at) return "No data";
    const celsius = Math.round(at - 273.15);
    return `${celsius >= 0 ? "+" : ""}${celsius}\u00B0C avg`;
  } catch {
    return "No data";
  }
}

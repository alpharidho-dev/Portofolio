import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET() {
  const apiKey = process.env.MONKEYTYPE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Key tidak ditemukan" },
      { status: 500 },
    );
  }

  try {
    const endpoint = "https://api.monkeytype.com/results";
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `ApeKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          success: false,
          error: `HTTP error ${response.status}`,
          details: errorText,
        },
        { status: response.status },
      );
    }

    const rawData = await response.json();
    console.log("Raw Monkeytype response:", JSON.stringify(rawData, null, 2));

    const results = rawData.data || rawData;
    if (!Array.isArray(results)) {
      return NextResponse.json({
        success: false,
        error: "Respons bukan array",
        data: rawData,
      });
    }

    const records = results.map((item: any) => ({
      wpm: item.wpm,
      accuracy: item.acc,
      language: item.mode || item.language || "javascript",
      duration_seconds: item.mode2 === "time" ? item.mode2Value : 60,
      recorded_at: new Date(item.timestamp).toISOString(),
    }));

    // Insert ke Supabase
    const inserted = [];
    const errors = [];

    for (const record of records) {
      const { data, error } = await supabase
        .from("typing_records")
        .insert(record)
        .select();

      if (error) {
        errors.push({ record, error: error.message });
        console.error("Insert error:", error);
      } else {
        inserted.push(data);
      }
    }

    return NextResponse.json({
      success: true,
      count: records.length,
      inserted: inserted.length,
      errors,
      endpoint,
    });
  } catch (error: any) {
    console.error("Exception:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

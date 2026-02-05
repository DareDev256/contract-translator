import { NextRequest, NextResponse } from "next/server";
import { parseFile } from "@/lib/parsers";
import { analyzeContract } from "@/lib/openai";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const text = formData.get("text") as string | null;

    let contractText: string;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      contractText = await parseFile(buffer, file.name);
    } else if (text?.trim()) {
      contractText = text.trim();
    } else {
      return NextResponse.json(
        { error: "Provide a file upload or contract text" },
        { status: 400 }
      );
    }

    if (contractText.length < 50) {
      return NextResponse.json(
        { error: "Contract text too short. Please provide a full contract." },
        { status: 400 }
      );
    }

    if (contractText.length > 100_000) {
      return NextResponse.json(
        { error: "Contract too long. Maximum 100,000 characters." },
        { status: 400 }
      );
    }

    const analysis = await analyzeContract(contractText);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 }
    );
  }
}

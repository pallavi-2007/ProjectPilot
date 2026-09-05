import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.6-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `
      CS project mentor guidance for: "${title}"
      
      Generate a brief development plan. Return valid JSON:
      {
        "features": ["1", "2"],
        "tech_stack": ["1", "2"],
        "development_steps": ["1", "2"],
        "improvements": ["1", "2"]
      }
    `;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating mentor details:", error);
    return NextResponse.json(
      { error: "Failed to generate mentor details" },
      { status: 500 }
    );
  }
}

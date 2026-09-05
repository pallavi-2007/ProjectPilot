import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { interests, skills, extra } = await req.json();

    if (!interests?.length || !skills?.length) {
      return NextResponse.json(
        { error: "Interests and skills are required" },
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
      CS final-year project ideas.
      Interests: ${interests.join(", ")}
      Skills: ${skills.join(", ")}
      Extra: ${extra || "None"}
      
      Generate exactly 4 ideas. Return valid JSON: {"ideas": [{"id": "1", "title": "...", "pitch": "One sentence only."}]}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanedText);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate ideas" },
      { status: 500 }
    );
  }
}

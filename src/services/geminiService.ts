import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export interface PluginInfo {
  name: string;
  type: string;
  description: string;
  sourceUrl: string;
  viralReason: string;
  developer: string;
  communityFeedback: string;
  rating: number; // 1-5 scale
}

export async function fetchViralSynths(): Promise<PluginInfo[]> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Find the top 6 most trending, viral, or recently news-worthy FREE synthesizer VST plugins (compatible with FL Studio). 
  Focus on plugins that have been featured in recent music production YouTube videos or news articles.
  For each plugin, provide:
  1. Name
  2. Type (e.g., Analog, FM, Wavetable)
  3. A short description
  4. The official website or download URL
  5. Why it is currently viral or trending (e.g., "Featured in a viral TikTok by producer X", "Major update released last week")
  6. Developer name
  7. A summary of community feedback or user sentiment (e.g., "Praised for its CPU efficiency", "Users love the vintage filter emulation")
  8. An estimated community rating from 1 to 5 based on general sentiment.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              description: { type: Type.STRING },
              sourceUrl: { type: Type.STRING },
              viralReason: { type: Type.STRING },
              developer: { type: Type.STRING },
              communityFeedback: { type: Type.STRING },
              rating: { type: Type.NUMBER },
            },
            required: ["name", "type", "description", "sourceUrl", "viralReason", "developer", "communityFeedback", "rating"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    return JSON.parse(text);
  } catch (error: any) {
    console.error("Error fetching from Gemini:", error);
    throw new Error(error.message || "Failed to fetch from Gemini API");
  }
}

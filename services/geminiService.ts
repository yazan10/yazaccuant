import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, Language, Platform } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.NUMBER, description: "A score from 0 to 100 representing profile quality." },
    summary: { type: Type.STRING, description: "A short, punchy summary of why the account isn't growing." },
    profile_audit: {
      type: Type.OBJECT,
      properties: {
        bio_check: { type: Type.STRING, description: "Critique of the bio." },
        visual_coherence: { type: Type.STRING, description: "Critique of the visual feed style or video consistency." },
        content_strategy: { type: Type.STRING, description: "Critique of the implied content strategy." },
      },
      required: ["bio_check", "visual_coherence", "content_strategy"],
    },
    problems: {
      type: Type.ARRAY,
      description: "List of specific problems stopping growth.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["high", "medium", "low"] },
        },
        required: ["title", "description", "severity"],
      },
    },
    solutions: {
      type: Type.ARRAY,
      description: "Actionable steps to fix the problems.",
      items: {
        type: Type.OBJECT,
        properties: {
          step: { type: Type.STRING, description: "The action to take." },
          details: { type: Type.STRING, description: "How to do it." },
        },
        required: ["step", "details"],
      },
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5-10 recommended hashtags based on the niche.",
    },
  },
  required: ["score", "summary", "profile_audit", "problems", "solutions", "hashtags"],
};

export const analyzeProfileWithGemini = async (
  username: string,
  niche: string,
  platform: Platform,
  language: Language
): Promise<AnalysisResult> => {
  try {
    const langName = language === 'ar' ? 'Arabic' : language === 'he' ? 'Hebrew' : 'English';
    const platformName = platform === 'instagram' ? 'Instagram' : 'TikTok';

    const promptText = `
      You are an expert Social Media Strategist and Growth Hacker for ${platformName}.
      
      User Context:
      Username/Link: ${username}
      Niche/Description: ${niche}
      Platform: ${platformName}
      
      Task:
      1. Analyze the potential growth bottlenecks for this niche on ${platformName}.
      2. Critique the Bio and Visuals based on best practices for ${platformName} (e.g., reels vs photos, hooks, trends).
      3. Identify why the account might not be growing (Shadowban risk, bad hooks, low retention, poor lighting, etc).
      4. Provide actionable solutions tailored to ${platformName} algorithms.
      5. Output ONLY JSON.
      6. IMPORTANT: All text in the JSON response MUST be in ${langName} language.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: {
        role: 'user',
        parts: [{ text: promptText }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: `You are a professional Social Media Auditor. Respond strictly in ${langName}.`,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
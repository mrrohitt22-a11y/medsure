import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with the named parameter and direct process.env.API_KEY access.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a prescription image using Gemini 3 Pro.
 * Optimized for complex medical reasoning and image-to-data extraction.
 */
export const analyzePrescription = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Analyze this medical prescription. Identify the medicines mentioned, their dosages, and provide a brief summary of what this prescription is for. Respond in JSON format." }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            medicines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  dosage: { type: Type.STRING },
                  quantity: { type: Type.STRING }
                },
                required: ['name']
              }
            },
            summary: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          }
        }
      }
    });

    // Access .text as a property, not a method.
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

/**
 * Generates health tips based on prescribed medicines.
 * Uses gemini-3-flash-preview for efficient text summarization and Q&A.
 */
export const getHealthTips = async (medicines: string[]) => {
  const prompt = `Provide 3 brief, actionable health tips for someone taking the following medicines: ${medicines.join(', ')}. Focus on side effects to watch for and dietary advice.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    // .text is a direct property of the response object.
    return response.text;
  } catch (error) {
    console.error("Gemini Tips Error:", error);
    return "Stay hydrated and consult your doctor if you feel unusual.";
  }
};

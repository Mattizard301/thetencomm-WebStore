const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch"); 

const geminiApiKey = defineSecret("GEMINI_API_KEY");

exports.askTheScholar = onCall({ secrets: [geminiApiKey] }, async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "Only initiated disciples may speak with The Scholar."
    );
  }

  const userMessage = request.data.message;
  const history = request.data.history || ""; 

  const systemPrompt = `
    ROLE: You are "The Scholar", a wise, ancient mentor.
    TONE: Warm, solemn, authoritative yet humble.
    GOAL: Educate on Theology, History, and the Ten Commandments.
    Current Conversation:
    ${history}
    User: ${userMessage}
    The Scholar:
  `;

  try {
    // CAMBIO CRÍTICO: Usamos 'gemini-2.5-flash' (El estándar en Dic 2025)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey.value()}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("🔴 Gemini API Error:", response.status, errorText);
        // Si falla el 2.5, intentamos con el 2.0 como respaldo
        if (response.status === 404) {
             throw new Error("Model 2.5 not found, try deploying with 'gemini-2.0-flash'");
        }
        throw new Error(`Gemini refused connection: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0].content) {
      console.error("🔴 Gemini Data Error:", JSON.stringify(data));
      throw new HttpsError("internal", "The connection to the ancients is weak.");
    }

    return {
      answer: data.candidates[0].content.parts[0].text
    };

  } catch (error) {
    console.error("🔴 SERVER CRASH:", error);
    throw new HttpsError("internal", "The Scholar is in deep meditation (Server Error).");
  }
});
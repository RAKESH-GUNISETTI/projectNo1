import { GEMINI_API_KEY, GEMINI_MODEL } from "@/config/api";

export interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

// Tech-related keywords and topics
const techKeywords = [
  'programming language', 'code', 'software', 'hardware', 'computer', 'technology', 'digital','developer','founder',
  'internet', 'web', 'mobile', 'app', 'database', 'cloud', 'security', 'network',
  'algorithm', 'data', 'development', 'engineering', 'system', 'platform', 'framework',
  'language', 'api', 'server', 'client', 'frontend', 'backend', 'devops', 'ai',
  'machine learning', 'artificial intelligence', 'blockchain', 'cryptography', 'cybersecurity'
];

function isTechRelated(query: string): boolean {
  const lowercaseQuery = query.toLowerCase();
  return techKeywords.some(keyword => lowercaseQuery.includes(keyword));
}

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    // Validate API key
    if (!GEMINI_API_KEY) {
      console.error("Gemini API key is not configured");
      return "I apologize, but the AI service is not properly configured at the moment. Please try again later.";
    }

    if (!isTechRelated(prompt)) {
      return "I apologize, but I'm specifically designed to assist with technology-related queries only. Please ask questions about programming, software development, hardware, or other technical topics. For non-technical questions, I recommend consulting appropriate resources or experts in those fields.";
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI response error:", errorData);
      
      if (response.status === 401) {
        return "I apologize, but there's an issue with the AI service authentication. Please try again later.";
      } else if (response.status === 429) {
        return "I'm currently experiencing high demand. Please wait a moment and try again.";
      } else {
        return "I'm having trouble processing your request right now. Please try again later.";
      }
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Invalid response format:", data);
      return "I received an unexpected response format. Please try again.";
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I'm having trouble processing your request right now. Please try again later.";
  }
}

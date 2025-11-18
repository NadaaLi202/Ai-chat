const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `${import.meta.env.VITE_GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

export const generateContent = async (message) => {

    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not define in ");
    }

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            },
                        ],
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log("Error response from Gemini API :", errorText);
            throw new Error(`Gemini API request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!data || !data.candidates || data.candidates.length === 0) {
            throw new Error("Invalid response structure from Gemini API");
        }

        return data.candidates[0].content.parts[0].text;

        // console.log(data);

        // محاولة استخراج النص من البنية المتوقعة
        let extracted = null;

        if (Array.isArray(data.candidates) && data.candidates.length > 0) {
            const candidate = data.candidates[0];

            if (typeof candidate.output_text === "string") {
                extracted = candidate.output_text;
            } else if (typeof candidate.text === "string") {
                extracted = candidate.text;
            } else if (Array.isArray(candidate.content) && candidate.content.length > 0) {
                const c0 = candidate.content[0];
                if (typeof c0.text === "string") extracted = c0.text;
                else if (Array.isArray(c0.parts)) {
                    extracted = c0.parts.map(p => p.text).filter(Boolean).join("\n");
                }
            } else if (Array.isArray(candidate.parts)) {
                extracted = candidate.parts.map(p => p.text).filter(Boolean).join("\n");
            }
        }

        if (!extracted) {
            extracted = JSON.stringify(data);
        }

        return extracted;

    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
};
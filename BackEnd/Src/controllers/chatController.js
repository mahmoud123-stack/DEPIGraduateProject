const API_KEY = "AIzaSyBS0DBzlOFEBwmaC7uDyZWoeduLpD4SCPs";

const prompt = `You are an AI system that generates career assessment questions.  need a set of structured questions that can be used to determine a user’s most suitable career path.Return the response strictly in **valid JSON format** as an array of questions Rules:Generate at least 12 questions.Use a mix of categories: skills, education, interests, and values. For 'single' and 'multiple' types, always provide options.For 'rating', ask the user to rate from 1–5 Keep questions clear, short, and easy to understand. Do not include any explanation or extra text outside the JSON. with the following schema [{'id': 'q1','question': 'string','type': 'single' | 'multiple' | 'rating' | 'text','options': ['option1', 'option2']}`;

const GenerateMethod = async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Raw response:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No valid response from model";

    res.json({ reply });
    console.log(reply);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { GenerateMethod };

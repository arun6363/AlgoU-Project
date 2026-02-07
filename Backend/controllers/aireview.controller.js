import { GoogleGenAI } from "@google/genai";



// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

const aireview = async (req,res)=>{
    const { code } = req.body;
      const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyse the following code and provide insights or any developments needed to improve performance and memory for the current code and provide any alternative approaches better then the current approach for this code ${code} as input`,
  });
  return res.status(200).json({"review":response.text});
}

export {aireview};
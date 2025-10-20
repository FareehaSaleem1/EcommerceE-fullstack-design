
import { GoogleGenerativeAI } from '@google/generative-ai';
import asyncHandler from 'express-async-handler';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateChatResponse = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400);
      throw new Error('Message is required');
    }

    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating response from AI' });
  }
});

export { generateChatResponse };
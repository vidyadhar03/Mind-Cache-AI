// const axios = require('axios');

// const chatWithOpenAI = async (messages) => {
//     try {
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//             model: "gpt-3.5-turbo",
//             messages: messages,
//             temperature: 0.7
//         }, {
//             headers: {
//                 'Authorization': `Bearer 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`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         return response.data.choices[0].message.content; // Adjust based on API response structure
//     } catch (error) {
//         console.error('Error communicating with OpenAI:', error);
//         return 'Error getting response from AI';
//     }
// };

// module.exports = { chatWithOpenAI };

require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

async function chatWithOpenAI(messages) {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
  } catch (e) {
    console.error("Error communicating with OpenAI:", e);
    return "Error getting response from AI";
  }
}

module.exports = { chatWithOpenAI };


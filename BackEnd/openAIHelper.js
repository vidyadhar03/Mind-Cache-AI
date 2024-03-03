
require("dotenv").config();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET,
});

// async function chatWithOpenAI(messages) {
//   try {
//     const completion = await openai.chat.completions.create({
//       messages: messages,
//       model: "gpt-3.5-turbo",
//     });

//     return completion.choices[0].message.content;
//   } catch (e) {
//     console.error("Error communicating with OpenAI:", e);
//     return "Error getting response from AI";
//   }
// }

async function StreamWithOpenAI(messages, broadcast) {
  //init empty when not testing
  // let fullResponse = "I will reply once i am integrated, dear Mind Cache AI User!";
  let fullResponse = "";

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.choices[0]?.delta?.content) {
        const content = chunk.choices[0].delta.content;
        fullResponse += content;
        broadcast(content); // Stream each chunk to the client
      }
    }

    // for (let i =0;i<15;i++){
    //   setTimeout(function(){
    //     const chunk = "sending chunk";
    //     fullResponse+=chunk;
    //     broadcast(chunk);
    //   },700)
    // }

    return fullResponse; // Return the full response for database update
  } catch (e) {
    console.error("Error communicating with OpenAI:", e);
    return "Error getting response from AI";
  }
}

module.exports = { StreamWithOpenAI};

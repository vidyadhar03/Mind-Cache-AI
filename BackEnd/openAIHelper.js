const axios = require('axios');

const chatWithOpenAI = async (messages) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content; // Adjust based on API response structure
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        return 'Error getting response from AI';
    }
};

module.exports = { chatWithOpenAI };

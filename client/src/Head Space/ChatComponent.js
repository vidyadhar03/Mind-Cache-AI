import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const sessionId = sessionStorage.getItem('sessionId') || 'sessionid1';
        const sessionId = 'sessionid1';

        try {
            const response = await axios.post('http://localhost:5000/api/chat', { sessionId, userInput });
            setMessages(response.data.messages);
            setUserInput('');
            if (!sessionId) {
                sessionStorage.setItem('sessionId', response.data.sessionId);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='p-6 flex justify-center'>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message"
                    className='border-2 rounded-lg'
                />
                <button type="submit" className='ml-4 bg-blue-100 hover:bg-blue-400 rounded-lg p-2'>Send</button>
            </form>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg.role === 'user' ? 'You: ' : 'AI: '}{msg.content}</p>
                ))}
            </div>
        </div>
    );
};

export default ChatComponent;

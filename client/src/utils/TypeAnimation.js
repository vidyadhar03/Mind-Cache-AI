import React, { useEffect, useState } from "react";

const messages = [
  "Transform Your Thoughts into Clarity...",
  "Introspect, Grow, and Evolve...",
  "Your Digital Therapist Companion...",
  "AI-Powered Insights for Self-Improvement...",
  "Track Your Mental Journey Over Time...",
  "Navigate Mental Wellness with AI...",
  "Empower Your Mind with Structured Reflection..."
];

const TypingAnimation = () => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);


  useEffect(() => {
    const typeMessage = () => {
      const currentMessage = messages[currentMessageIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < currentMessage.length) {
          setDisplayedMessage(currentMessage.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeChar, 100); // Time to type each character
        } else {
          setTimeout(() => {
            setDisplayedMessage("");
            setCurrentMessageIndex((currentMessageIndex + 1) % messages.length);
          }, 2000); // Time before typing next message
        }
      };

      typeChar();
    };

    typeMessage();
  }, [currentMessageIndex]);

  return <div>{displayedMessage}</div>;
};

export default TypingAnimation;

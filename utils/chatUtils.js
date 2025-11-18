export const getRandomResponse = () => {

    const botResponses = [
        "I understand your question. Let me think about that...",
        "That's an interesting point! Here's what I know...",
        "Based on my knowledge, I can tell you that....",
        "I'd be happy to help with that! Here's some information...",
        "Great question! The answer depends on several factors...",
    ];

    return botResponses[Math.floor(Math.random() * botResponses.length)];

};

export const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
const Chatapp = () => {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const sendPrompt = async () => {
        if (!prompt.trim()) {
            setMessages((prev) => [
                ...prev,
                { sender: "system", text: "❗ Veuillez entrer une question." },
            ]);
            return;
        }

        const userMessage = { sender: "user", text: prompt };
        setMessages((prev) => [...prev, userMessage]);
        setPrompt("");

        setIsTyping(true);

        try {
            const res = await fetch("http://localhost:3000/api/assistant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "assistant", text: data.response },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { sender: "system", text: `Erreur : ${data.error}` },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "system", text: `Erreur réseau : ${error.message}` },
            ]);
        } finally {
            setIsTyping(false); // Désactiver l'animation de saisie
        }
    };

    return (
        <div>
            <style>{`
                .chat-toggle {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    background-color: white;
                    color: rgb(19, 149, 94);
                    border: none;
                    border-radius: 70%;
                    padding: 16px;
                    cursor: pointer;
                    font-size: 20px;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                    transition: background-color 0.3s ease;
                    z-index: 50;
                }

                .chat-toggle:hover {
                    background-color: #1b5e20;
                }

                .chat-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 999;
                }

                .chat-box {
                    width: 90%;
                    max-width: 400px;
                    background: #ffffff;
                    border: 2px solid #66bb6a;
                    border-radius: 20px;
                    padding: 20px;
                    position: relative;
                    box-shadow: 0 8px 20px rgba(0, 128, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    height: 80%;
                }

                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .chat-header h3 {
                    color: #2e7d32;
                    font-size: 1.2rem;
                    font-weight: bold;
                }

                .chat-header button {
                    background: transparent;
                    border: none;
                    font-size: 20px;
                    font-weight: bold;
                    color: #2e7d32;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .chat-header button:hover {
                    color: red;
                }

                .chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    margin-bottom: 12px;
                    padding: 10px;
                    background: #f1f8e9;
                    border-radius: 8px;
                    border: 1px solid #c8e6c9;
                }

                .message {
                    margin-bottom: 10px;
                    padding: 8px;
                    border-radius: 8px;
                    max-width: 80%;
                    word-wrap: break-word;
                    display: flex;
                    align-items: center;
                }

                .message.user {
                    background: #e3f2fd;
                    align-self: flex-end;
                    color: #1e88e5;
                }

                .message.assistant {
                    background: #e8f5e9;
                    align-self: flex-start;
                    color: #2e7d32;
                }

                .message.system {
                    background: #ffebee;
                    align-self: center;
                    color: #d32f2f;
                    font-style: italic;
                }

                .message .icon {
                    margin-right: 8px;
                }

                .typing-indicator {
                    align-self: flex-start;
                    color: #2e7d32;
                    font-style: italic;
                    margin-bottom: 10px;
                    display: flex;
                    align-items: center;
                }

                .typing-indicator span {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin: 0 2px;
                    background-color: #2e7d32;
                    border-radius: 50%;
                    animation: blink 1.4s infinite ease-in-out both;
                }

                .typing-indicator span:nth-child(1) {
                    animation-delay: -0.32s;
                }

                .typing-indicator span:nth-child(2) {
                    animation-delay: -0.16s;
                }

                .typing-indicator span:nth-child(3) {
                    animation-delay: 0s;
                }

                @keyframes blink {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }

                .chat-textarea {
                    width: 100%;
                    padding: 10px;
                    font-size: 14px;
                    border: 1px solid #a5d6a7;
                    border-radius: 8px;
                    resize: none;
                    margin-bottom: 12px;
                    outline: none;
                    background: white;
                    color: black;

                }

                .chat-textarea:focus {
                    border-color: #66bb6a;
                    box-shadow: 0 0 5px #a5d6a7;
                    color: black;
                }

                .chat-send-btn {
                    width: 100%;
                    background: #2e7d32;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .chat-send-btn:hover {
                    background: #1b5e20;
                }
            `}</style>

            {!showChat && (
                <button
                    onClick={() => setShowChat(true)}
                    className="chat-toggle"
                    aria-label="Ouvrir l’assistante"
                >
                    <FaRobot style={{marginTop: '-28%'}}size={24} />
                </button>
            )}

            {showChat && (
                <div className="chat-overlay">
                    <div className="chat-box">
                        <div className="chat-header">
                            <h3><FaRobot /> Assistante IA</h3>
                            <button onClick={() => setShowChat(false)}>✕</button>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.sender}`}
                                >
                                    <span className="icon">
                                        {msg.sender === "user" ? "👤" : "🤖"}
                                    </span>
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            )}
                        </div>

                        <input
                            className="chat-textarea"
                            placeholder="Pose ta question ici..."
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <button className="chat-send-btn" onClick={sendPrompt}>
                            Envoyer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatapp;

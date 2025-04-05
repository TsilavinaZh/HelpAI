import { FaMicrophone } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { FaUser, FaRobot } from "react-icons/fa";

export default function ChatW() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const botMessage = {
        from: "bot",
        text: data.response || "Pas de réponse.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Erreur lors de l'envoi du message." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div className="chat-border-wrapper">
        <div className="chat-container">
          <div className="chat-header">
            <h4 style={{color: '#007660'}}>Comment puis-je vous aider ?</h4>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                <div className="icon">
                  {msg.from === "user" ? (
                    <FaUser size={20} />
                  ) : (
                    <FaRobot size={20} />
                  )}
                </div>
                <div className="text">{msg.text}</div>
              </div>
            ))}

            {loading && (
              <div className="message bot typing">
                <div className="icon">
                  <FaRobot size={20} />
                </div>
                <div className="text">
                  <span className="dots">...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Envoyer un message..."
              value={input}
              style={{ backgroundColor: "#fff", color: "black", border: '2px solid #007660' }}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={() => (window.location.href = "/mobile")}>
              <FaMicrophone color="white" />
            </button>

            <button onClick={sendMessage}>
              <BsSend color="white" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-border-wrapper {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f8f9fa;
        }
        .chat-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          box-sizing: border-box;
          border: 2px solid rgb(0, 118, 96);
        }
        .chat-header {
          text-align: center;
          margin-bottom: 1rem;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          border: 1px solid #ccc;
          padding: 1rem;
          background-color: #f8f9fa;
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .message.user {
          justify-content: flex-end;
          flex-direction: row-reverse;
          text-align: right;
        }
        .message.bot {
          justify-content: flex-start;
        }
        .message .icon {
          flex-shrink: 0;
        }
        .message .text {
          background-color: #e1f5fe;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          max-width: 70%;
        }
        .message.user .text {
          background-color: #dcedc8;
        }
        .message.typing .text {
          font-style: italic;
          color: gray;
        }
        .chat-input-area {
          display: flex;
          gap: 0.5rem;
        }
        input[type="text"] {
          flex: 1;
          padding: 0.5rem;
        }
        button {
          background-color: #007bff;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .dots::after {
          content: "";
          display: inline-block;
          animation: dots 1.2s steps(3, end) infinite;
        }
        @keyframes dots {
          0% {
            content: "";
          }
          33% {
            content: ".";
          }
          66% {
            content: "..";
          }
          100% {
            content: "...";
          }
        }
      `}</style>
    </>
  );
}

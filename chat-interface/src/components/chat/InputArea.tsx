import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Message } from "../../types/chat";
import { sendMessageToAPI } from "../../services/api";
import { Mic, Send, Activity } from "lucide-react";
import listening from "../../assets/listening.gif";

const suggestions = [
  "Tell me about Hooks in React",
  "What are some state management tips?",
  "How to optimize React performance?",
];

const InputArea = () => {
  const { dispatch } = useContext(ChatContext)!;
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMessage, setIsVoiceMessage] = useState(false);

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error("Speech Recognition API is not supported in this browser.");
  }

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      setIsVoiceMessage(true);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  }

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    } else if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const sendMessage = async (message?: string) => {
    const text = message || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      timestamp: new Date(),
      type: "user",
      source: isVoiceMessage ? "speech" : "text",
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });

    setInput("");
    setIsLoading(true);
    setIsVoiceMessage(false);

    const aiResponse = await sendMessageToAPI(text);

    const aiMessage: Message = {
      id: aiResponse.id,
      content: aiResponse.content,
      timestamp: new Date(aiResponse.timestamp),
      type: "ai",
      source: "text",
    };

    dispatch({ type: "ADD_MESSAGE", payload: aiMessage });
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-interface">
      {isLoading && (
        <div className="typing-indicator flex justify-start items-center gap-2 p-2">
          <Activity size={20} className="texting-animation swinging" />
          <span>AI is typing...</span>
        </div>
      )}

      <div className="suggestions flex gap-2 p-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="suggestion-button bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
            onClick={() => sendMessage(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {isListening && (
          <div className="listening-indicator flex justify-end items-center gap-2">
            <img src={listening} alt="Listening..." className="listening-gif" />
            <span>Listening...</span>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <div className="action-buttons">
          <button onClick={() => sendMessage()} disabled={isLoading} className="send-button">
            <Send size={20} />
          </button>
          <button
            className={`mic-button ${isListening ? 'listening' : ''}`}
            onClick={startListening}
            onDoubleClick={() => {
              if (recognition && isListening) {
                recognition.stop();
                setIsListening(false);
              }
            }}
            disabled={isLoading}
          >
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;

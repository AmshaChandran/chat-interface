import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageThread from "./MessageThread";
import InputArea from "./InputArea";
import ThemeToggle from "../settings/ThemeToggle";
import bubbleImage from "../../assets/chatbubble.png";

const ChatContainer = () => {
  const { state } = useContext(ChatContext)!;

  return (
    <div className={`chat-container ${state.settings.theme}`}>
      <header className="chat-header">
        <div className="header-left">
          <img src={bubbleImage} alt="Chat Logo" className="chat-logo" />
          <div className="header-text">
            <h1>AI Chat Assistant</h1>
            <span className="text-base">Speech recognition enabled</span>
          </div>
        </div>
        <div className="header-right">
          
          <ThemeToggle />
          
        </div>
      </header>
      <MessageThread />
      <InputArea />
    </div>
  );
};

export default ChatContainer;
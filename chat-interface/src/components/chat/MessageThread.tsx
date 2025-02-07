import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import MessageBubble from "../chat/MessageBubble";

const MessageThread = () => {
  const { state } = useContext(ChatContext)!;

  return (
    <div className="message-thread">
      {state.messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default MessageThread;

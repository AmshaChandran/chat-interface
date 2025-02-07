import { Message } from "../../types/chat";
import { Mic } from "lucide-react"; // Import Mic icon for voice messages

const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className={`message-bubble ${message.type}`}>
      <div className={message.source === 'speech' ? 'flex items-center gap-2' : ''}>
        {message.source === 'speech' && <Mic size={16} className="text-gray-500" />}
        <p>{message.content}</p>
      </div>
      <span className="text-xs text-gray-500">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default MessageBubble;
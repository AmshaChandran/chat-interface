import { ChatProvider } from "./context/ChatContext";
import ChatContainer from "./components/chat/ChatContainer";
import "./index.css";

const App = () => (
  <ChatProvider>
    <div className="app-container">
      <ChatContainer />
    </div>
  </ChatProvider>
);

export default App;
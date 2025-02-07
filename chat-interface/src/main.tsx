import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from ReactDOM
import App from "./App";
import { ChatProvider } from "./context/ChatContext"; // Import ChatProvider


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
);

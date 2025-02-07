import { createContext, useReducer, ReactNode } from "react";
import { ChatState, Message } from "../types/chat";

const initialState: ChatState = {
  messages: [],
  isRecording: false,
  isProcessing: false,
  settings: {
    theme: "light",
    language: "en",
    speechEnabled: false,
  },
};

type Action =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_PROCESSING"; payload: boolean };

const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_THEME":
      return { ...state, settings: { ...state.settings, theme: action.payload } };
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload };
    default:
      return state;
  }
};

export const ChatContext = createContext<
  { state: ChatState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

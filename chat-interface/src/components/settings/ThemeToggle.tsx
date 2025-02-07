import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Settings} from "lucide-react";
const ThemeToggle = () => {
  const { state, dispatch } = useContext(ChatContext)!;

  return (
    <button className="icon-button"
          onClick={() =>
            dispatch({ 
              type: "SET_THEME", 
              payload: state.settings.theme === "light" ? "dark" : "light" 
            })
          }>
            <Settings size={20} />
          </button>
  );
};

export default ThemeToggle;

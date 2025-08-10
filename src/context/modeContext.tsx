import { createContext } from "react";

interface modeContextType {
    mode : 'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard',
    toggleMode : (modeType : 'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard') => void
}

const modeContext = createContext<modeContextType>({
  mode: "chat",
  toggleMode: () => {},
});

export default modeContext;
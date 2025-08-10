import { useMemo, useState, type PropsWithChildren } from "react";
import modeContext from '../context/modeContext'

export default function ModeProvider({ children } : PropsWithChildren) {
    const [mode , setMode] = useState<'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard'>('chat');
    const contextValue = useMemo(() => ({
        mode , 
        toggleMode: (modeType : 'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard') => {
            setMode(modeType)
        }
    }), [mode])

    return <modeContext.Provider value={contextValue}>
            {children}
    </modeContext.Provider>
}
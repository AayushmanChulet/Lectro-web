import modeContext from "@/context/modeContext"
import { useContext } from "react"

export default function NavBar() {

    const {toggleMode} = useContext(modeContext);
    const toggle  = ( mode : 'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard' ) => {
        toggleMode(mode);
    }
    return <nav className="w-full flex justify-between items-center px-8 py-4 text-xl ">
        <span className="">
            Lectro
        </span>
        <span className="flex gap-7 items-center justify-around">
            <span onClick={() => toggle("chat")}>Chat</span>
            <span onClick={() => toggle("notes")}>Notes</span>
            <span onClick={() => toggle("summary")}>Summary</span>
            <span onClick={() => toggle("quiz")}>Quiz</span>
            <span onClick={() => toggle("flashcard")}>FlashCard</span>
        </span>
    </nav>
}
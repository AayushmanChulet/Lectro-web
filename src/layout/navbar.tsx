import modeContext from "@/context/modeContext"
import { cn } from "@/lib/utils";
import { useContext } from "react"

export default function NavBar() {

    const {mode , toggleMode} = useContext(modeContext);
    const toggle  = ( mode : 'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard' ) => {
        toggleMode(mode);
    }
    return <nav className="w-full flex justify-between items-center px-8 py-4 text-xl ">
        <span className="">
            Lectro
        </span>
        <span className="flex gap-7 items-center justify-around">
            <span onClick={() => toggle("chat") } className={cn(`${mode == 'chat' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer")}>Chat</span>
            <span onClick={() => toggle("notes")} className={cn(`${mode == 'notes' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer")}>Notes</span>
            <span onClick={() => toggle("summary")} className={cn(`${mode == 'summary' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer")}>Summary</span>
            <span onClick={() => toggle("quiz")} className={cn(`${mode == 'quiz' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer")}>Quiz</span>
            <span onClick={() => toggle("flashcard")} className={cn(`${mode == 'flashcard' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer")}>FlashCard</span>
        </span>
    </nav>
}
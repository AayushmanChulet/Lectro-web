import modeContext from "@/context/modeContext"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useContext } from "react"
import { useLocation } from 'react-router';


export default function NavBar() {

    const {mode , toggleMode} = useContext(modeContext);
    const toggle  = ( mode : 'chat' | 'notes' | 'summary' | 'quiz' | 'flashcard' ) => {
        toggleMode(mode);
    }

    const location = useLocation()

    return <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-neutral-800">
        {location.pathname == '/'? <nav className="container mx-auto flex items-center justify-between py-4 text-xl ">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="text-text text-xl">Lectro</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="story-link text-text hover:text-primary"
            >
              Features
            </a>
            <a href="#how" className="story-link text-text hover:text-primary">
              How it works
            </a>
            <a href="#faq" className="story-link text-text hover:text-primary">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="destructive" className="hover-scale outline">
              <a href="#try">Get started</a>
            </Button>
          </div>
        </nav> : <nav className={cn("min-w-full px-3 lg:px-12 py-5 min-h-14 flex flex-row justify-between items-center text-xl text-text", "container mx-auto flex items-center justify-between py-4 text-xl")}>
        <span className=" leading-[0.97] font-bold ">
            Lectro
        </span>
        <span className="flex gap-7 items-center justify-around">
            <span onClick={() => toggle("chat") } className={cn(`${mode == 'chat' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer hover:text-primary")}>Chat</span>
            <span onClick={() => toggle("notes")} className={cn(`${mode == 'notes' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer hover:text-primary")}>Notes</span>
            <span onClick={() => toggle("summary")} className={cn(`${mode == 'summary' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer hover:text-primary")}>Summary</span>
            <span onClick={() => toggle("quiz")} className={cn(`${mode == 'quiz' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer hover:text-primary")}>Quiz</span>
            <span onClick={() => toggle("flashcard")} className={cn(`${mode == 'flashcard' ? "underline-offset-4 underline" : ""}`, "hover:cursor-pointer hover:text-primary")}>FlashCard</span>
        </span>
        
    </nav>}
    </header>
}
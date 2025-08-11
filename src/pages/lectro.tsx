import Chat from "@/components/chat/chat";
import FlashCard from "@/components/flashCard/flashcard";
import Notes from "@/components/notes/notes";
import Quiz from "@/components/quiz/quiz";
import Summary from "@/components/summary/summary";
import modeContext from "@/context/modeContext";
import { useContext } from "react"
import {  useParams } from "react-router";

export default function Lectro(){
	const params = useParams();
  const { mode } = useContext(modeContext)

    return <main className="flex flex-col h-full md:flex-row flex-1 justify-center items-stretch gap-4 p-4">
        <div 
          
          className="w-full md:w-3/5 bg-amber-200 rounded-lg shadow-lg overflow-hidden flex items-center justify-center p-4"
        >
          <iframe
            width={"100%"}
            height={"100%"}
            src={`https://www.youtube.com/embed/${params.url}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-md"
          />
        </div>
        <div className="w-full md:w-2/5 bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col">
        {mode == 'chat' && <Chat videoId={params.url}/>}
        {mode == 'flashcard' && <FlashCard videoId={params.url}/>}
        {mode == 'notes' && <Notes videoId={params.url}/>}
        {mode == 'quiz' && <Quiz videoId={params.url}/>}
        {mode == 'summary' && <Summary videoId={params.url}/>}
        </div>
      </main>
} 
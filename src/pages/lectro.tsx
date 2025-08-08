import Chat from "@/components/chat/chat";
import FlashCard from "@/components/flashCard/flashcard";
import Notes from "@/components/notes/notes";
import Quiz from "@/components/quiz/quiz";
import Summary from "@/components/summary/summary";
import { useEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router";

export default function Lectro(){

  const iframeContainerRef = useRef(null)
  const [iframeSize, setIframeSize] = useState({ width: '100%', height: '100%' })
	const params = useParams();


  useEffect(() => {
    const updateIframeSize = () => {
      if (iframeContainerRef.current) {
        const container = iframeContainerRef.current
        const containerHeight = container.offsetHeight
        setIframeSize({ 
          width: '100%', 
          height: `${containerHeight}px`
        })
      }
    }

    updateIframeSize()
    window.addEventListener('resize', updateIframeSize)
    return () => window.removeEventListener('resize', updateIframeSize)
  }, [])    

    return <main className="flex flex-col h-full md:flex-row flex-1 justify-center items-stretch gap-4 p-4">
        <div 
          ref={iframeContainerRef}
          className="w-full md:w-3/5 bg-amber-200 rounded-lg shadow-lg overflow-hidden flex items-center justify-center p-4"
        >
          <iframe
            width={iframeSize.width}
            height={iframeSize.height}
            src={`https://www.youtube.com/embed/${params.url}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-md"
          />
        </div>
        <div className="w-full md:w-2/5 bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col">
        <Quiz/>
        </div>
      </main>
}
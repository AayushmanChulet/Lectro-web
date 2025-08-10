import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

export default function FlashCard({videoId} : {videoId : string | undefined} ) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetchCards();
    }, [])

    const fetchCards = async ( ) => {
        const cardsResponse : any  = await axios.get(`${BACKEND_URL}}/api/v1/app/flashcards/${videoId}`);

        if(!cardsResponse.status){
            console.log("something went wrong");
        }
        setCards(cardsResponse.data.data);
    }

  const [idx, setIdx] = useState(0);

  const handlePrevCard = ( ) => {
    if(idx == 0) {
        setIdx(cards.length-1);
        return;
    }
    setIdx(prev => prev-1);
  }

  const handleNextCard = ( ) => {
    if(idx == cards.length-1) {
        setIdx(0);
        return;
    }
    setIdx(prev => prev+1);
  }

    return <div className="w-full h-full flex justify-center items-center gap-3">
        <div className="w-108 h-136 p-3 flex flex-col gap-3">
            <div className="h-[85%] w-full bg-blue-500 flex flex-col gap-3 p-6 rounded-xl not-[]:font-mono">
                <div className="text-2xl text-white">
                    {cards.length > 0  && cards[idx].question}
                </div>
                <div className="text-xl text-blue-100">
                    {cards.length > 0  && cards[idx].answer}
                </div>
            </div>
            <div className="flex w-full justify-evenly items-center">
                <Button variant={"outline"} className="w-32" onClick={handlePrevCard}>Previous</Button>
                <Button variant={"outline"} className="w-32" onClick={handleNextCard}>Next</Button>
            </div>
        </div>
    </div>
}
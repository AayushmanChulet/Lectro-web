import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { LoaderOne } from "../ui/loader";

interface card {
  question: string;
  answer: string;
}

interface CardsResponse {
  data: card[];
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function FlashCard({
  videoId,
}: {
  videoId: string | undefined;
}) {
  const [cards, setCards] = useState<card[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setErrors] = useState<string | undefined>(undefined);

  const fetchCards = useCallback(async () => {
    setIsLoaded(true);
    setErrors(undefined);
    if (!videoId) {
      setIsLoaded(false);
      return;
    }
    try {
      const cardsResponse = await axios.get<CardsResponse>(
        `${BACKEND_URL}/api/v1/app/flashcards/${videoId}`
      );

      if (cardsResponse.status !== 200) {
        console.log("Failed to fetch flashcards:", cardsResponse.status);
        setErrors("Failed to fetch flashcards");
        setIsLoaded(false);
        return;
      }
      setCards(cardsResponse.data.data);
      setIsLoaded(false);
    } catch (err) {
      setErrors("Error fetching flashcard: " + (err as Error).message);
      setIsLoaded(false);
      console.log("Error fetching flashcard : ", err);
    }
  }, [videoId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const [idx, setIdx] = useState(0);

  const handlePrevCard = () => {
    if (idx == 0) {
      setIdx(cards.length - 1);
      return;
    }
    setIdx((prev) => prev - 1);
  };

  const handleNextCard = () => {
    if (idx == cards.length - 1) {
      setIdx(0);
      return;
    }
    setIdx((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <div className="text-3xl font-bold">Flash Cards</div>
      <div className="w-108 h-136 p-3 flex flex-col gap-3 justify-center items-center ">
        {isLoaded ? <LoaderOne /> :
          error ? (
            <>
              {error}
              <Button onClick={fetchCards} variant={"secondary"}>
                Reload
              </Button>
            </>
          ) :  (
            <>
              <div className="h-[85%] w-full bg-blue-500 flex flex-col gap-3 p-6 rounded-xl not-[]:font-mono">
                <div className="text-2xl text-white">
                  {cards.length > 0 && cards[idx].question}
                </div>
                <div className="text-xl text-blue-100">
                  {cards.length > 0 && cards[idx].answer}
                </div>
              </div>
              <div className="flex w-full justify-evenly items-center">
                <Button
                  variant={"outline"}
                  className="w-32"
                  onClick={handlePrevCard}
                >
                  Previous
                </Button>
                <Button
                  variant={"outline"}
                  className="w-32"
                  onClick={handleNextCard}
                >
                  Next
                </Button>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

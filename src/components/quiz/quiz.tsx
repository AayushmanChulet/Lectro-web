import { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toaster } from "../ui/toaster";
import { LoaderOne } from "@/components/ui/loader";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";

interface options {
  code: "a" | "b" | "c" | "d";
  value: string;
}

interface quiz {
  question: string;
  options: options[];
  answer: "a" | "b" | "c" | "d";
}

interface quizResponse {
  data: quiz[];
}

export default function Quiz({ videoId }: { videoId: string | undefined }) {
  const [quiz, setQuiz] = useState<quiz[] | []>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [optionSelected, setOptionSelected] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const isDoneRef = useRef<ConfettiRef>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchQuiz = useCallback(async () => {
    setIsLoading(true);
    setErrors(null);
    try {
      const quizResponse = await axios.get<quizResponse>(
        `${BACKEND_URL}/api/v1/app/quiz/${videoId}`
      );

      if (quizResponse.status !== 200) {
        throw new Error("Quiz not generated.");
      }
      setQuiz(quizResponse.data.data);
      setScore(0);
      setCurrentQuestionIdx(0);
      setOptionSelected(undefined);
    } catch (err) {
      setErrors("Failed to load quiz. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [BACKEND_URL, videoId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleSubmit = () => {
    if (!optionSelected) {
      toaster.create({
        title: "No Option Selected",
        description: "Please select an answer before submitting.",
      });
      return;
    }

    if (optionSelected === quiz[currentQuestionIdx].answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIdx < quiz.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setOptionSelected(undefined);
    } else {
      setIsDone(true);
      isDoneRef.current?.fire();
    }
  };

  const handleOptionSelect = (option: string) => {
    setOptionSelected(option);
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl h-[80%] rounded-2xl shadow-lg flex flex-col items-center p-6 gap-6">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
          <div className="text-lg font-semibold text-blue-500">
            Score: {score}/{quiz.length > 0 ? quiz.length : "-"}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 h-full w-full">
          {!isStarted ? (
            <div
              className="text-gray-700 text-center flex flex-col justify-center items-center gap-7"
              role="status"
            >
              <div className="text-2xl">Start your quiz.</div>
              <Button
                onClick={() => setIsStarted(true)}
                variant={"outline"}
                className="text-white"
              >
                Start now
              </Button>
            </div>
          ) : isDone ? (
            <div className="w-full flex flex-col items-center justify-center text-2xl gap-6 animate-fade-in">
              <Confetti
                ref={isDoneRef}
                className="absolute  z-0 size-full"
              >
                You scored {score}/{quiz.length > 0 ? quiz.length : "-"}
              </Confetti>
            </div>
          ) : isLoading ? (
            <LoaderOne />
          ) : errors ? (
            <div className="text-red-500 text-center" role="alert">
              {errors}
              <button
                onClick={fetchQuiz}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Retry fetching quiz"
              >
                Retry
              </button>
            </div>
          ) : quiz.length === 0 ? (
            <div className="text-gray-700 text-center" role="status">
              No quiz questions available.
            </div>
          ) : (
            <div className="w-full flex flex-col gap-6 animate-fade-in">
              <div className="text-2xl text-center">
                {quiz[currentQuestionIdx].question}
              </div>
              <div
                className="grid grid-cols-2 gap-2 text-lg"
                role="region"
                aria-label="Quiz question"
              >
                {quiz[currentQuestionIdx].options.map((op, index) => (
                  <label
                    key={index}
                    className="flex gap-3 p-2 bg-blue-200 rounded-xl items-center justify-start cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIdx}`}
                      value={op.code}
                      checked={optionSelected === op.code}
                      onChange={() => handleOptionSelect(op.code)}
                    />
                    <span>{op.value}</span>
                  </label>
                ))}
              </div>
              <Button variant={"outline"} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

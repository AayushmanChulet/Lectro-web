import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSparkles } from "@tabler/icons-react";
import { PlayCircle } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function Landing() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleTry = () => {
    if(inputRef.current == null){
      return
    }

    if (
      !inputRef.current.value ||
      !inputRef.current.value.includes("youtube.com/watch")
    ) {
      return console.log("provide proper url");
    }

    const urlObj = new URL(inputRef.current.value);
    const id = urlObj.searchParams.get("v");
    navigate(`${id}`);
  };
  return (
    <div className="min-h-screen text-text">
      <main className="h-full">
        <section className="min-h-[95%] relative overflow-hidden">
          <div className="container  mx-auto flex flex-col justify-center gap-30 items-center py-20 ">
            <div className="flex flex-col items-center justify-center gap-10">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-purple-800 text-sm font-medium mb-8 border border-purple-200">
                <IconSparkles className="w-4 h-4 mr-2" />
                AI-Powered Learning Revolution
                <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-center flex-col gap-5">
                <div className="text-7xl text-center poppins-medium">
                  Your AI Teaching
                  <br /> Assistant
                </div>
                <div className="text-2xl w-2/3 text-center poppins-medium">
                  Transform any YouTube video into interactive study materials.
                  Get AI-generated flashcards, quizzes, summaries, and instant
                  answers to boost your learning efficiency.
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="relative ">
                  <PlayCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input aria-label="YouTube URL" placeholder="Paste YouTube URL" className="pl-10 rounded-2xl w-80" ref={inputRef}/>
                </div>
                <Button type="submit" variant={"outline"} className="shrink-0" onClick={handleTry}>Try Lectro</Button>
            </div>
          </div>
        </section>

        <section id="faq" className="">
          <div className="container mx-auto py-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Frequently asked questions
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>

                    Do I need an account to try Lectro?
                  </AccordionTrigger>
                  <AccordionContent>
                    No. You can paste a YouTube link and explore the generated
                    materials without creating an account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Which videos work best?</AccordionTrigger>
                  <AccordionContent>
                    Lectro works with most public YouTube videos. Educational
                    lectures, tutorials, and talks produce the best results.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I trust the answers?</AccordionTrigger>
                  <AccordionContent>
                    Lectro grounds responses in the video’s transcript and
                    content, and cites the relevant parts when possible.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

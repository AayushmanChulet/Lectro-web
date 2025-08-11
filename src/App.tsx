import { useRef } from "react";
import { GraduationCap, PlayCircle, Brain, FileText, ListChecks, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/lectro-hero.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleTry = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="text-primary" />
            <span>Lectro</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="story-link">Features</a>
            <a href="#how" className="story-link">How it works</a>
            <a href="#faq" className="story-link">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="soft" className="hidden sm:inline-flex">Sign in</Button>
            <Button asChild variant="hero" className="hover-scale"><a href="#try">Get started</a></Button>
          </div>
        </nav>
      </header>

      <main>
        <section ref={heroRef} className="relative overflow-hidden">
          <div className="hero-gradient" aria-hidden="true" />
          <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center py-20">
            <div className="space-y-6 animate-fade-in">
              <Badge variant="secondary" className="px-3 py-1">
                <Sparkles className="mr-2" /> New: Quiz & Flashcards
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Lectro — AI Teaching Assistant for YouTube
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Paste a YouTube link. Get flashcards, quizzes, summaries, structured notes, and a smart chatbot that answers questions about the video.
              </p>
              <form onSubmit={handleTry} id="try" className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="relative flex-1">
                  <PlayCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input aria-label="YouTube URL" placeholder="Paste YouTube URL" className="pl-10" />
                </div>
                <Button variant="hero" type="submit" className="shrink-0">Try Lectro</Button>
              </form>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>No sign-up required</span>
                <span>•</span>
                <span>Privacy-friendly</span>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img src={heroImage} alt="Lectro educational assistant illustration with YouTube, flashcards, quiz, chatbot, summary and notes icons" className="w-full h-auto rounded-lg border" />
            </div>
          </div>
        </section>

        <section id="features" className="border-t">
          <div className="container mx-auto py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold">Everything you need to master any video</h2>
              <p className="text-muted-foreground mt-2">Built for students, teachers, and lifelong learners.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="text-primary" /> Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Concise, accurate overviews of the video to grasp the big ideas fast.</CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ListChecks className="text-primary" /> Flashcards</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Smart flashcards with spaced repetition friendly formatting.</CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Brain className="text-primary" /> Quizzes</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Auto-generated quizzes to test recall and understanding.</CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MessageSquare className="text-primary" /> Chatbot</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Ask questions about the video and get grounded answers.</CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="text-primary" /> Notes</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Clean, structured notes with key points, terms, and timestamps.</CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><PlayCircle className="text-primary" /> YouTube URL</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Just paste a link — Lectro takes care of the rest.</CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how" className="border-t">
          <div className="container mx-auto py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold">How it works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><PlayCircle className="text-primary" /> 1. Paste URL</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Drop a YouTube link into Lectro. No friction.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> 2. Let AI assist</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Lectro analyzes the video and builds learning materials.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><GraduationCap className="text-primary" /> 3. Learn smarter</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">Study with flashcards, quizzes, notes, summaries, and chat.</CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t">
          <div className="container mx-auto py-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold">Frequently asked questions</h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do I need an account to try Lectro?</AccordionTrigger>
                  <AccordionContent>No. You can paste a YouTube link and explore the generated materials without creating an account.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Which videos work best?</AccordionTrigger>
                  <AccordionContent>Lectro works with most public YouTube videos. Educational lectures, tutorials, and talks produce the best results.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I trust the answers?</AccordionTrigger>
                  <AccordionContent>Lectro grounds responses in the video’s transcript and content, and cites the relevant parts when possible.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Lectro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

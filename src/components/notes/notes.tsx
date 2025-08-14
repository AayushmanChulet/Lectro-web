import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

interface NotesResponse {
  data: string;
}

export default function Notes({ videoId }: { videoId: string | undefined }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  const fetchNotes = useCallback(async () => {

    setLoading(true);
    setError(null);

     if (!videoId) {
      setError("Missing video ID.");
      setLoading(false);
      return;
    }

    try {
      const notesResponse = await axios.get<NotesResponse>(
        `${BACKEND_URL}/api/v1/app/notes/${videoId}`
      );

      if (notesResponse.status !== 200) {
        throw new Error("Invalid response");
      }
      setNotes(notesResponse.data.data);
    } catch (err) {
      setError("Error fetching notes");
      console.log("Error fetching notes : ", err);
    } finally {
      setLoading(false);
    }
  }, [videoId, BACKEND_URL]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);
  return (
    <div className="h-full overflow-hidden w-full flex flex-col items-center justify-center gap-6 p-6 ">
      <div className="text-3xl font-bold">Notes</div>
      <div className="w-full h-128 bg-white rounded-2xl flex flex-col justify-start items-center overflow-y-auto p-4 gap-2" role="log"
        aria-live="polite">
        {loading ? (
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="h-6 w-3/4" /> 
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" /> 
            <Skeleton className="h-6 w-4/6" /> 
            <Skeleton className="h-6 w-3/4" /> 
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" /> 
            <Skeleton className="h-6 w-4/6" /> 
            <Skeleton className="h-6 w-3/4" /> 
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" /> 
            <Skeleton className="h-6 w-4/6" /> 
          </div>
        ) : error ? (
          <div
            className="text-red-500 text-center flex flex-col items-center"
            role="alert"
          >
            {error}
            <button
              onClick={fetchNotes}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Retry fetching notes"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none w-full">
            <Markdown>{notes}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

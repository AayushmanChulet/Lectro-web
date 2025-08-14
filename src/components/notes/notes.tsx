import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { LoaderOne } from "../ui/loader";
import Markdown from "react-markdown";

interface NotesResponse {
  data: string;
}

export default function Notes({ videoId }: { videoId: string | undefined }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const notesResponse = await axios.get<NotesResponse>(
        `${BACKEND_URL}/api/v1/app/notes/${videoId}`
      );

      if (!notesResponse.status) {
        console.log("something went wrong");
      }
      setNotes(notesResponse.data.data);
    } catch (err) {
      setError("Error fetching notes");
      console.log("Error fetching notes : ", err);
    }
  }, [videoId, BACKEND_URL]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);
  return (
    <div className="h-full overflow-hidden w-full flex flex-col items-center justify-center gap-6 p-6 ">
      <div className="text-3xl font-bold">Notes</div>
      <div className="w-full h-128 bg-white rounded-2xl flex flex-col justify-start items-center overflow-scroll p-4 gap-2" role="log"
        aria-live="polite">
        {notes.length > 0 ? !error ? <Markdown>{notes}</Markdown> : <div className="text-red-500 text-center" role="alert">
            {error}
            <button
              onClick={fetchNotes}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Retry fetching quiz"
            >
              Retry
            </button>
          </div> :<div className="flex justify-center items-center w-full h-full"> <LoaderOne /> </div> }
      </div>
    </div>
  );
}

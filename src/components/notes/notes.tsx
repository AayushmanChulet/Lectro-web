import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { LoaderOne } from "../ui/loader";

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
    <div className="h-full overflow-hidden  -full w-full flex flex-col items-center justify-center gap-6 p-6 ">
      <div className="text-3xl font-bold">Notes</div>
      <div className="w-full h-full bg-white rounded-2xl flex justify-center items-center">
        {notes.length > 0 ? !error ? notes : error : <LoaderOne />}
      </div>
    </div>
  );
}

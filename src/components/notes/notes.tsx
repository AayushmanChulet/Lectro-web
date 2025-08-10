import axios from "axios";
import { useEffect, useState } from "react";

export default function Notes({videoId} : {videoId : string | undefined}) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [notes, setNotes] = useState("");

    useEffect(()=> {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const notesResponse = await axios.get(`${BACKEND_URL}/api/v1/app/notes/${videoId}`);

        if(!notesResponse.status){
            console.log("something went wrong");
        }
        setNotes(notesResponse.data.data);
    }

    return <div className="h-full overflow-hidden flex flex-col items-center justify-center gap-7">
        <div className="text-2xl font-bold">
            Notes
        </div>
        <div>
            {notes}
        </div>
    </div>
}
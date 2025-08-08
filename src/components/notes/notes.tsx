import axios from "axios";
import { useEffect, useState } from "react";

export default function Notes() {

    const [notes, setNotes] = useState("");

    useEffect(()=> {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const notesResponse = await axios.get(`http://localhost:3000/api/v1/app/notes/${"i4b_ETwPoTE"}`);

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
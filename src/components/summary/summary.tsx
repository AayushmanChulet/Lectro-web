import axios from "axios";
import { useEffect, useState } from "react";

export default function Summary() {

    const [summary, setSummary] = useState("");

    useEffect(()=> {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        const summaryResponse  = await axios.get(`http://localhost:3000/api/v1/app/summary/${"i4b_ETwPoTE"}`);

        if(!summaryResponse.status){
            console.log("something went wrong");
        }
        setSummary(summaryResponse.data.data);
    }

    return <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800">
            Video Summary
        </h2>
        <div>
            {summary}
        </div>
    </div>
}
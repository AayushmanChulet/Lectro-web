import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface SummaryResponse {
    data: string;
}

export default function Summary({videoId} : {videoId : string | undefined}) {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [summary, setSummary] = useState("");

    const fetchSummary = useCallback(async () => {
        if (!videoId) return;
        
        try {
            const summaryResponse = await axios.get<SummaryResponse>(`${BACKEND_URL}/api/v1/app/summary/${videoId}`);

            if (summaryResponse.status !== 200) {
                console.log("Failed to fetch summary:", summaryResponse.status);
                return;
            }
            setSummary(summaryResponse.data?.data || "");
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }, [videoId]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800">
            Video Summary
        </h2>
        <div>
            {summary}
        </div>
    </div>
}
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { LoaderOne } from "../ui/loader";

interface SummaryResponse {
  data: string;
}

export default function Summary({ videoId }: { videoId: string | undefined }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [summary, setSummary] = useState<string>("");
  const [errors, setErrors] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    if (!videoId) return;

    try {
      try {
        const summaryResponse = await axios.get<SummaryResponse>(
          `${BACKEND_URL}/api/v1/app/summary/${videoId}`
        );

        if (summaryResponse.status !== 200) {
          console.log("Failed to fetch summary:", summaryResponse.status);
          throw new Error("Request failed");
          return;
        }
        setSummary(summaryResponse.data?.data || "");
      } catch (err) {
        setErrors("Error fetching summary");
        console.log("Error fetching summary : ", err);
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [videoId, BACKEND_URL]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-6 ">
      <h2 className="text-3xl font-bold text-gray-800">Video Summary</h2>
      <div className="w-full h-full bg-white rounded-2xl flex justify-center items-center">
        {summary}
        {summary.length > 0 ? !errors ? summary : errors : <LoaderOne />}
      </div>
    </div>
  );
}

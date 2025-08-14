import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Skeleton } from "../ui/skeleton";

interface SummaryResponse {
  data: string;
}

export default function Summary({ videoId }: { videoId: string | undefined }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [summary, setSummary] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading , setLoading] = useState<boolean>(true);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);

     if (!videoId) {
      setError("Missing video ID.");
      setLoading(false);
      return;
    }

    try {
      try {
        const summaryResponse = await axios.get<SummaryResponse>(
          `${BACKEND_URL}/api/v1/app/summary/${videoId}`
        );

        if (summaryResponse.status !== 200) {
          console.log("Failed to fetch summary:", summaryResponse.status);
          throw new Error("Request failed");
        }
        setSummary(summaryResponse.data?.data || "");
      } catch (err) {
        setError("Error fetching summary");
        console.log("Error fetching summary : ", err);
      }finally {
      setLoading(false);
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
              onClick={fetchSummary}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Retry fetching notes"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none w-full">
            <Markdown>{summary}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

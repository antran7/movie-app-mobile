import { useCallback, useEffect, useState } from "react";
import axios from "axios";
export const TMDB_IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w500"
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN || "";

export function useFetch(endpoint: string, query: Record<string, any> = {}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${TMDB_BASE_URL}${endpoint}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                },
                params: query
            })

            setData(res.data);
        } catch (error: any) {
            console.log("Axios error: ", error.message, error.response?.data);
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [endpoint, JSON.stringify(query)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData }
}
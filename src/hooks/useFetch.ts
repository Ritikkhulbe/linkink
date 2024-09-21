import { useEffect, useState } from "react";

const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

export default useFetch;
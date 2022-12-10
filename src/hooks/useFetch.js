import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [fetched, setFetched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setFetched(data);
      } catch (error) {
        setErr(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { fetched, loading, err };
};

export default useFetch;

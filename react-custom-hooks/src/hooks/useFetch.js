import { useEffect, useState } from "react";

function useFetch(fetchFn, initialValue) {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const reponse = await fetchFn();
        setFetchedData(reponse);
      } catch (error) {
        setError(
          error.message ||
            "Une erreur inattendue est survenue. Merci de réessayer plus tard."
        );
      }

      setIsLoading(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    error: error,
    loading: loading,
    data: fetchedData,
    setData: setFetchedData,
  };
}

export default useFetch;

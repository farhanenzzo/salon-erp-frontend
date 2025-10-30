import { useEffect, useState } from "react";

const useFetchData = (api, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(params);

        // Check if the API returned a response
        if (response) {
          console.log("API Response:", response); // Add this to see the response
          setData(response);
        } else {
          console.log(
            "No response from the API or response is null/undefined."
          );
          setData(null); // Handle cases where the response is not as expected
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Improved error logging
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetchData;

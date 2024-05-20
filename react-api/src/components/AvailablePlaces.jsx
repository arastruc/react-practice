import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const reponse = await fetch("http://localhost:5000/places");

        if (!reponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des places. Erreur ${reponse.status}`
          );
        }

        const fetchPlaces = await reponse.json();
        setPlaces(fetchPlaces.places);
      } catch (error) {
        setError(
          error.message ||
            "Une erreur inattendue est survenue. Merci de réessayer plus tard."
        );
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  return !error ? (
    loading ? (
      <div className="loader" style={{ margin: "auto" }}></div>
    ) : (
      <Places
        title="Available Places"
        places={places}
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
      />
    )
  ) : (
    <Error title="Impossible de récupérer les lieux" message={error} />
  );
}

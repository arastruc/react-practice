import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const reponse = await fetch("http://localhost:5000/user-places");

        if (!reponse.ok) {
          throw new Error(
            `Erreur lors de la récupération des places de l'utilisateur. Erreur ${reponse.status}`
          );
        }

        const fetchUserPlaces = await reponse.json();
        setUserPlaces(fetchUserPlaces.places);
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

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function updateUserPlaces(newPlaces) {
    try {
      const response = await fetch("http://localhost:5000/user-places", {
        method: "PUT",
        body: JSON.stringify(newPlaces),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(error);
    }
  }

  async function handleSelectPlace(selectedPlace) {
    if (userPlaces.some((place) => place.id === selectedPlace.id)) {
      return;
    }

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);

      setUserPlaces((prevPickedPlaces) => {
        if (!prevPickedPlaces) {
          prevPickedPlaces = [];
        }

        return [selectedPlace, ...prevPickedPlaces];
      });
    } catch {
      return;
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      const updatedUserPlaces = userPlaces.filter(
        (place) => place.id !== selectedPlace.current.id
      );

      try {
        await updateUserPlaces(updatedUserPlaces);

        setUserPlaces(updatedUserPlaces);
        setModalIsOpen(false);
      } catch {
        setUserPlaces(userPlaces);
        setModalIsOpen(false);
        return;
      }
    },
    [userPlaces]
  );

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {!error ? (
          loading ? (
            <div className="loader" style={{ margin: "auto" }}></div>
          ) : (
            <Places
              title="I'd like to visit ..."
              fallbackText="Select the places you would like to visit below."
              places={userPlaces}
              onSelectPlace={handleStartRemovePlace}
            />
          )
        ) : (
          <Error title="Impossible de récupérer les lieux" message={error} />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

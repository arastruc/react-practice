import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";
import ModalEffect from "./components/ModalEffect.jsx";
import { useCallback } from "react";

function App() {
  const storedItems =
    JSON.parse(localStorage.getItem("selectedPlaces"), 2) || [];

  const initialStoredItems = storedItems.map((idItem) =>
    AVAILABLE_PLACES.find(({ id }) => id == idItem)
  );

  // const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(initialStoredItems);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setAvailablePlaces(
        sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
        )
      )
    );
  }, []);

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
    // modal.current.close();
  }

  const handleSelectPlace = useCallback(function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    if (storedItems.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedItems])
      );
    }
  }, []);

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(
        storedItems.filter((item) => item.id === selectedPlace.current)
      )
    );
    setIsModalOpen(false);
    // modal.current.close();
  }, []);

  return (
    <>
      {/* <Modal ref={modal}> */}
      <ModalEffect open={isModalOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </ModalEffect>
      {/* </Modal> */}

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting Places by distance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;

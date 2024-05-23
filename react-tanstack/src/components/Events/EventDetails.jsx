/* eslint-disable react/no-unescaped-entities */
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { deleteEventById, fetchEventById } from "../../queries/fetch.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEventById({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeletion,
    error: errorDeletion,
  } = useMutation({
    mutationFn: deleteEventById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/");
    },
  });

  function handleDelete() {
    mutate(id);
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function handleCancelDelete() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isModalOpen && (
        <Modal onClose={handleCancelDelete}>
          <p>Souhaitez-vous supprimer l'évènement {data?.title}</p>
          <div className="form-actions">
            {isPendingDeletion ? (
              <p>Deleting, please wait...</p>
            ) : (
              <>
                <button className="button" onClick={handleDelete}>
                  Oui
                </button>
                <button className="button-text" onClick={handleCancelDelete}>
                  Non
                </button>
              </>
            )}
          </div>
          {isErrorDeletion && (
            <ErrorBlock
              title="Failed to delete message"
              message={errorDeletion?.message}
            />
          )}
        </Modal>
      )}
      {!isLoading ? (
        !isError ? (
          <>
            <article id="event-details">
              <header>
                <h1>{data?.title}</h1>
                <nav>
                  <button onClick={showModal}>Delete</button>
                  <Link to="edit">Edit</Link>
                </nav>
              </header>
              <div id="event-details-content">
                <img src={`http://localhost:5000/${data?.image}`} alt="" />
                <div id="event-details-info">
                  <div>
                    <p id="event-details-location">{data?.location}</p>
                    <time dateTime={`Todo-DateT$Todo-Time`}>
                      {data?.date}@ {data?.time}
                    </time>
                  </div>
                  <p id="event-details-description">{data?.description}</p>
                </div>
              </div>
            </article>
          </>
        ) : (
          <ErrorBlock
            message={error.message}
            title={"Impossible de télécharger le détail"}
          />
        )
      ) : (
        "Chargement de la page"
      )}
    </>
  );
}

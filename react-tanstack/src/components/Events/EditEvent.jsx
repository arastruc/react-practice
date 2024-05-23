import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEventById, updateEvent } from "../../queries/fetch.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEventById({ signal, id }),
  });

  const {
    mutate,
    isPending: isPendingUpdating,
    // isError: isErrorUpdating,
    // error: errorUpdating,
  } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const previousEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], newEvent);
      return { previousEvent };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["events", id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      navigate("../");
    },
  });

  function handleSubmit(updatedEvent) {
    mutate({ id: id, event: updatedEvent });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Fetch to fetch events."}
      />
    );
  } else {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {isPendingUpdating ? (
          <p>Mise à jour en cours...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

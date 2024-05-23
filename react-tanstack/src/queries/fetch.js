export async function fetchEvents({ signal, searchTerm }) {
  const response = await fetch(
    `http://localhost:5000/events${searchTerm ? `?search=${searchTerm}` : ""}`,
    { signal: signal }
  );

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function fetchEventById({ signal, id }) {
  const response = await fetch(`http://localhost:5000/events/${id}`, {
    signal: signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEventById(id) {
  const response = await fetch(`http://localhost:5000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { message } = await response.json();

  return message;
}

export async function postEvent(newEvent) {
  const response = await fetch(`http://localhost:5000/events`, {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function updateEvent({ id, event }) {
  console.log(JSON.stringify({ event }));
  const response = await fetch(`http://localhost:5000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event: respEvent } = await response.json();

  return respEvent;
}

export async function getImageEvents() {
  const response = await fetch(`http://localhost:5000/events/images`);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

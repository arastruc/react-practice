import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

const NewProject = ({ cancelProject, saveProject }) => {
  const title = useRef();
  const description = useRef();
  const date = useRef();
  const modal = useRef();

  let errors = [];

  function validateNotEmpty(value, key) {
    if (!value || value?.trim() === "") {
      errors.push(key);
    }
  }

  function validateInput() {
    validateNotEmpty(title.current.value, "title");
    validateNotEmpty(description.current.value, "description");
    validateNotEmpty(date.current.value, "date");
    console.log(errors);
  }

  function save() {
    errors = [];

    validateInput();

    if (errors.length === 0)
      saveProject({
        title: title.current.value,
        description: description.current.value,
        date: date.current.value,
        tasks: [],
      });
    else {
      modal.current.showModal();
    }
  }
  return (
    <div className="w-[35rem] mt-16">
      <Modal ref={modal}>
        <h2 className="font-bold text-xl">Invalid Input</h2>
        <p className="bg-red-300">Something's wrong !</p>
      </Modal>
      <menu className="flex items-center justify-end gap-1 my-4">
        <li>
          <button
            onClick={cancelProject}
            className="text-stone-700 hover:text-stone-950 bg-stone-300 hover:bg-stone-100 p-2 rounded"
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={save}
            className="text-stone-50 bg-stone-950 hover:bg-stone-600 p-2 rounded"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={title} label="Title" type="text" />
        <Input ref={description} label="Description" type="text" isTextarea />
        <Input ref={date} label="Due Date" type="date" />
      </div>
    </div>
  );
};

export default NewProject;

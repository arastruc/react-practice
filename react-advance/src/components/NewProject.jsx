import { useRef } from "react";
import Input from "./Input";

const NewProject = ({ cancelProject, saveProject }) => {
  const title = useRef();
  const description = useRef();
  const date = useRef();

  return (
    <div className="w-[35rem] mt-16">
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
            onClick={() =>
              saveProject({
                title: title.current.value,
                description: [description.current.value],
                date: date.current.value,
                tasks: [],
              })
            }
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

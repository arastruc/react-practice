import { useRef } from "react";
import TaskItem from "./TaskItem";

const Project = ({ projectData, deleteProject, updateProject }) => {
  const { title, date, description, tasks } = projectData;

  const input = useRef();

  function handleAddTask() {
    const newTask = input.current.value;
    input.current.value = "";
    updateProject({ ...projectData, tasks: [...tasks, newTask] });
  }

  function handleClear(index) {
    updateProject({ ...projectData, tasks: tasks.toSpliced(index, 1) });
  }

  return (
    <section className="w-3/6 mx-8 mr-20 my-8">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="uppercase text-2xl font-bold">{title}</h2>
          <p className="text-xl text-gray-500">
            {new Date(date).toDateString()}
          </p>

          <p className="text-lg my-6">{description}</p>
        </div>
        <div className="text-xl">
          <button onClick={() => deleteProject(projectData)}>Delete</button>
        </div>
      </div>
      <hr />

      <div className="flex flex-col">
        <h2 className="uppercase text-2xl font-bold my-8">Tasks</h2>
        <p>
          <input ref={input} type="text" className="bg-stone-300 mr-4" />
          <button onClick={handleAddTask}>Add Task</button>
        </p>

        {tasks.length !== 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <TaskItem key={index} onClear={() => handleClear(index)}>
                {task}
              </TaskItem>
            ))}
          </ul>
        ) : (
          <p className="italic">List of task is empty ! Please add one.</p>
        )}
      </div>
    </section>
  );
};

export default Project;

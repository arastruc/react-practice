import Button from "./Button";

const SideBar = ({ projects, selectProject, addProject }) => {
  return (
    <aside className="bg-stone-900 md:w-1/3 px-8 py-16 text-stone-50 rounded-r-lg w-72">
      <h2 className="uppercase mb-8 text-2xl font-bold">Your projects</h2>
      <Button onClick={addProject}>+ Add Project</Button>
      <ul className="m-8 text-lg">
        {projects.map(({ title }, index) => (
          <li
            key={index}
            className="py-2 px-4 my-4 text-lg text-stone-300 bg-stone-700 hover:bg-stone-500 hover:text-stone-100"
          >
            <button
              className="w-full text-left"
              onClick={() => selectProject(index)}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;

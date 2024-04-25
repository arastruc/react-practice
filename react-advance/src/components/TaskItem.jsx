const TaskItem = ({ children, onClear }) => {
  return (
    <li className="flex justify-between bg-stone-100 my-4 py-4 px-2">
      <p>{children}</p>
      <button onClick={onClear}>Clear</button>
    </li>
  );
};

export default TaskItem;

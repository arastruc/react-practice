const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="m-8 py-2 px-8 md:text-xl text-stone-400 bg-stone-700 rounded-md hover:bg-stone-500 hover:text-stone-100"
    >
      {children}
    </button>
  );
};

export default Button;

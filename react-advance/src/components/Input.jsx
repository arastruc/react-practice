import { forwardRef } from "react";

const Input = forwardRef(function MyInput(
  { label, isTextarea, ...props },
  ref
) {
  return (
    <p className="flex flex-col  gap-1 my-4">
      <label className="text-sm font-bold uppercase txt-stone-500">
        {label}
      </label>
      {!isTextarea ? (
        <input
          ref={ref}
          className="w-full p-1 border-b-4 border-t-2 border-x-2 rounded border-stone-300 text-stone-600 focus:outline-2 focus:border-stone-600"
          {...props}
        />
      ) : (
        <textarea
          ref={ref}
          className="w-full p-1 border-b-4 border-t-2 border-x-2 rounded border-stone-300 text-stone-600 focus:outline-2 focus:border-stone-600"
          {...props}
        />
      )}
    </p>
  );
});

export default Input;

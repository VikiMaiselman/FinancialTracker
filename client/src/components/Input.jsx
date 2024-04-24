import React from "react";

export default function Input({ label, list = "", options = null, ...props }) {
  const classes =
    "h-9 border-b-2 px-2 rounded-md border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-2 w-full">
      <label
        className={`text-sm font-bold uppercase ${label?.startsWith("Error") ? "text-red-500" : "text-stone-500"}`}
      >
        {label}
      </label>
      <input className={classes} list={list} {...props} />
      {Boolean(list) ? (
        <datalist id={list}>
          {React.Children.toArray(
            options?.map((option) => {
              return <option value={option.name} />;
            })
          )}
        </datalist>
      ) : null}
    </p>
  );
}

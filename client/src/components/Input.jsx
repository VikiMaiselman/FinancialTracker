export default function Input({ textarea = false, ...props }) {
  const classes =
    "border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-2">
      <label className="text-sm font-bold uppercase text-stone-500"></label>
      {textarea ? <textarea className={classes} {...props} /> : <input className={classes} {...props} />}
    </p>
  );
}

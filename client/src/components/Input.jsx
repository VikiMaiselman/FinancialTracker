export default function Input({ label, textarea = false, ...props }) {
  const classes =
    "h-9 border-b-2 rounded-md border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-2">
      <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
      {textarea ? <textarea className={classes} {...props} /> : <input className={classes} {...props} />}
    </p>
  );
}

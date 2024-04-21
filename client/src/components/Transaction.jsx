import Button from "./Button";

export default function Transaction({ tx }) {
  return (
    <>
      <div className="w-full flex justify-around gap-10 px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-400">
        <p>{tx?.name}</p>
        <p>{tx?.amount}</p>
        <p>{tx?.date}</p>
        <p>{tx?.subtype}</p>
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <Button>Cancel</Button>
          </li>
          <li>
            <Button>Save</Button>
          </li>
        </menu>
      </div>
    </>
  );
}

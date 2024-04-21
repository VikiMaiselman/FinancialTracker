import Button from "./Button";
import Input from "./Input";

export default function CreateTransaction() {
  return (
    <>
      <h2 className="text-xl font-bold text-stone-700 mt-4">Create New Transaction</h2>

      <form className="w-full flex justify-around items-center gap-1 px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-400">
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <p className="flex flex-col gap-1 my-2">
          <Button>Save</Button>
        </p>
      </form>
    </>
  );
}

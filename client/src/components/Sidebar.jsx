import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="h-screen w-1/3 px-8 pt-16 pb-8 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-200">My Dashboard</h2>

      <ul className="h-5/6 flex flex-col content-between justify-between">
        <div className="mt-8 flex flex-col items-start">
          <Link
            to="/"
            className="w-full px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100 focus:text-stone-100 focus:text-xl"
          >
            My Transactions
          </Link>
          <Link
            to="/incomes"
            className="w-full px-4 py-2 my-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100 focus:text-stone-100 focus:text-xl"
          >
            My Incomes
          </Link>
          <Link
            to="/expenses"
            className="w-full px-4 py-2 my-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100 focus:text-stone-100 focus:text-xl"
          >
            My Expenses
          </Link>
          <Link
            to="/savings"
            className="w-full px-4 py-2 my-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100 focus:text-stone-100 focus:text-xl"
          >
            My Savings
          </Link>
          <Link
            to="/wishes"
            className="w-full px-4 py-2 my-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100 focus:text-stone-100 focus:text-xl"
          >
            My Wishes
          </Link>
        </div>
        <Link
          to="/logout"
          className="w-full px-4 py-2 my-1 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:text-stone-100 focus:text-stone-100 focus:text-xl"
        >
          Log Out
        </Link>
      </ul>
    </aside>
  );
}

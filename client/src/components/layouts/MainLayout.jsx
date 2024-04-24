import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="w-screen justify-between flex gap-1">
      <Sidebar />
      <div
        className="h-screen w-full text-center py-24 flex justify-center items-start overflow-auto bg-stone-100
      "
      >
        {children}
      </div>
    </div>
  );
}

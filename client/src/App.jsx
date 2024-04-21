import { useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    // <div className="w-screen justify-between flex gap-1">
    <AppRoutes />
    // </div>
  );
}

export default App;

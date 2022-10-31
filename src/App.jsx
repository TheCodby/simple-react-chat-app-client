require("dotenv").config();
import "./App.css";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <main className="h-screen w-full flex flex-row items-center lg:p-10 justify-center">
      <Outlet />
    </main>
  );
}

export default App;

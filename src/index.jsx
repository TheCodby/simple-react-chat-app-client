import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Welcome from "./pages/welcome";
import Chatbox from "./pages/chatbox";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "chat",
        element: <Chatbox />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

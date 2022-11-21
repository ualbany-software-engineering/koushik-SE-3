import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./Login";
import ErrorPage from "./Error";
import Navbar from "./Navbar";
import App from "./App";
import Register from "./Register";
import Profile from "./Profile";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    //loader: rootLoader,
    //action: rootAction,
    children: [
      { index: true, element: <App /> },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
        //loader: rootLoader,
        //action: rootAction,
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
        //loader: rootLoader,
        //action: rootAction,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
        //loader: rootLoader,
        //action: rootAction,
      },
      {
        path: "/contacts",
        element: <App />,
        errorElement: <ErrorPage />,
        /*
        loader: async ({ params }) => {
          let res = await fetch("/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          let resp = await res.json();
          return resp.found;
        },
        */
        //action: rootAction,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

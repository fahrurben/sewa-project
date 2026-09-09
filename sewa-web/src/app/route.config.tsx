import { createBrowserRouter } from "react-router";
import RootLayout from "./root.layout";
import Login from "../views/login/login.view";
import Home from "../views/home/index.view";

const routeConfig = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "tenant",
        children: [
          { Component: Home, index: true },
          { path: "login", Component: Login },
        ],
      },
    ],
  },
]);

export default routeConfig;

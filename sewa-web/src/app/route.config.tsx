import { createBrowserRouter } from "react-router";
import RootLayout from "./root.layout";
import Login from "../views/tenant/login/login.view";
import PropertyList from "../views/tenant/property/index.view";
import PropertyCreateView from "../views/tenant/property/create.view";
import MainLayout from "./main.layout";

const routeConfig = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "tenant",
        children: [
          {
            Component: MainLayout,
            children: [
              { Component: PropertyList, index: true },
              {
                path: "property",
                children: [{ path: "create", Component: PropertyCreateView }],
              },
            ],
          },
          { path: "login", Component: Login },
        ],
      },
    ],
  },
]);

export default routeConfig;

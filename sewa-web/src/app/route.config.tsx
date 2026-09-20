import { createBrowserRouter } from "react-router";
import Login from "../views/tenant/login/login.view";
import PropertyCreateView from "../views/tenant/property/create.view";
import PropertyEditView from "../views/tenant/property/edit.view";
import PropertyList from "../views/tenant/property/index.view";
import MainLayout from "./main.layout";
import RootLayout from "./root.layout";

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
                children: [
                  { path: "create", Component: PropertyCreateView },
                  { path: "edit/:id", Component: PropertyEditView },
                ],
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

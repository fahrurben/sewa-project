import { createBrowserRouter } from "react-router";
import RootLayout from "./root.layout";
import Login from "../views/login/login.view";

const routeConfig = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "tenant",
        children: [{ path: "login", Component: Login }],
      },
    ],
  },
]);

export default routeConfig;

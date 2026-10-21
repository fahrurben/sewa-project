import { createBrowserRouter } from "react-router";
import Login from "../views/tenant/login/login.view";
import PropertyCreateView from "../views/tenant/property/create.view";
import PropertyEditView from "../views/tenant/property/edit.view";
import PropertyList from "../views/tenant/property/index.view";
import AgreementTemplateList from "../views/tenant/agreement_template/index.view";
import MainLayout from "./main.layout";
import RootLayout from "./root.layout";
import AgreementTemplateCreateView from "../views/tenant/agreement_template/create.view";
import AgreementTemplateEditView from "../views/tenant/agreement_template/edit.view";
import ProfileIndexView from "../views/tenant/profile/index.view";
import Home from "../views/home/home.view";
import SignInView from "../views/signin/signin.view";
import { default as ApplicationListView } from "../views/application/list.view";
import PropertyDetailsView from "../views/property/propertydetails.view";
import FrontendLayout from "./frontend.layout";
import MyRentView from "../views/renter/myrent.view";

const routeConfig = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        Component: FrontendLayout,
        children: [
          {
            Component: Home,
            index: true,
          },
          {
            path: "login",
            Component: SignInView,
          },
          {
            path: "applications",
            Component: ApplicationListView,
          },
          { path: "property/details/:id", Component: PropertyDetailsView },
          {
            path: "my-rent",
            Component: MyRentView,
          },
        ],
      },
      {
        path: "tenant",
        children: [
          {
            Component: MainLayout,
            children: [
              { Component: PropertyList, index: true },
              { path: "profile", Component: ProfileIndexView },
              {
                path: "property",
                children: [
                  { path: "create", Component: PropertyCreateView },
                  { path: "edit/:id", Component: PropertyEditView },
                ],
              },
              {
                path: "agreement-template",
                children: [
                  { Component: AgreementTemplateList, index: true },
                  { path: "create", Component: AgreementTemplateCreateView },
                  { path: "edit/:id", Component: AgreementTemplateEditView },
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

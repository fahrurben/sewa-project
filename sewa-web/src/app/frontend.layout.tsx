import { Theme } from "@astryxdesign/core";
import { Outlet } from "react-router";
import { neutralTheme } from "@astryxdesign/theme-neutral";

const FrontendLayout = () => {
  return (
    <Theme theme={neutralTheme} mode="dark">
      <Outlet />
    </Theme>
  );
};

export default FrontendLayout;

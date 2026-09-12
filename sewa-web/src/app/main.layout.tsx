import {
  AppShell,
  Layout,
  TopNav,
  TopNavHeading,
  TopNavItem,
} from "@astryxdesign/core";
import { Outlet } from "react-router";

const TopNavWrapper = () => {
  return (
    <TopNav
      label="Main navigation"
      heading={<TopNavHeading heading="Sewa" />}
      startContent={
        <>
          <TopNavItem label="Dashboard" href="#" isSelected />
          <TopNavItem label="Projects" href="#" />
          <TopNavItem label="Reports" href="#" />
        </>
      }
    />
  );
};

const MainLayout = () => {
  return (
    <AppShell topNav={<TopNavWrapper />}>
      <Layout content={<Outlet />} />
    </AppShell>
  );
};

export default MainLayout;

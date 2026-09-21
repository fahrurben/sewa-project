import {
  AppShell,
  Badge,
  Heading,
  Layout,
  SideNav,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
  TopNav,
  TopNavHeading,
  TopNavItem,
} from "@astryxdesign/core";
import { HomeIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router";

const TopNavWrapper = () => {
  return (
    <TopNav
      label="Main navigation"
      heading={<Heading level={1}>Sewa</Heading>}
      startContent={<></>}
    />
  );
};

const SideBarWrapper = () => {
  return (
    <SideNav>
      <SideNavSection title="Navigation" isHeaderHidden>
        <SideNavItem label="Home" icon={HomeIcon} href="/tenant" />
      </SideNavSection>
    </SideNav>
  );
};

const MainLayout = () => {
  return (
    <AppShell topNav={<TopNavWrapper />} sideNav={<SideBarWrapper />}>
      <Layout content={<Outlet />} />
    </AppShell>
  );
};

export default MainLayout;

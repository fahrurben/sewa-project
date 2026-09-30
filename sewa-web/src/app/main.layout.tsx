import {
  AppShell,
  Heading,
  Layout,
  SideNav,
  SideNavItem,
  SideNavSection,
  TopNav,
} from "@astryxdesign/core";
import { HomeIcon, FolderIcon } from "@heroicons/react/24/outline";
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
        <SideNavItem
          label="Agreement Template"
          icon={FolderIcon}
          href="/tenant/agreement-template"
        />
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

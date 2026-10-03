import {
  AppShell,
  Button,
  Divider,
  Heading,
  Icon,
  IconButton,
  Layout,
  Link,
  Popover,
  SideNav,
  SideNavItem,
  SideNavSection,
  TopNav,
  VStack,
} from "@astryxdesign/core";
import {
  HomeIcon,
  FolderIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router";
import { API_URL } from "../common/constant";
import axios from "axios";

const TopNavWrapper = () => {
  const navigate = useNavigate();

  const onLogoutClicked = async () => {
    const url = `${API_URL}/logout`;
    await axios.post(
      url,
      {},
      {
        withCredentials: true,
      },
    );
    navigate("/tenant/login");
  };

  return (
    <TopNav
      label="Main navigation"
      heading={<Heading level={1}>Sewa</Heading>}
      startContent={<></>}
      endContent={
        <div>
          <Popover
            placement="below"
            label="Settings"
            width={280}
            content={
              <VStack gap={3}>
                <Heading level={4}>Settings</Heading>
                <Divider />
                <Link href="/tenant/profile" isStandalone>
                  Profile
                </Link>
                <Link onClick={onLogoutClicked} isStandalone>
                  Logout
                </Link>
              </VStack>
            }
          >
            <IconButton
              label="Settings"
              variant="secondary"
              icon={<Icon icon={UserCircleIcon} />}
              elevation="high"
            />
          </Popover>
        </div>
      }
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

import { LayerProvider } from "@astryxdesign/core/Layer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import routeConfig from "./route.config.tsx";
import { Theme } from "@astryxdesign/core";
import { neutralTheme } from "@astryxdesign/theme-neutral";

const queryClient = new QueryClient();

const ContainerApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayerProvider toast={{ position: "bottomEnd" }}>
          <Theme theme={neutralTheme} mode="light">
            <RouterProvider router={routeConfig}></RouterProvider>
          </Theme>
        </LayerProvider>
      </QueryClientProvider>
    </>
  );
};

export default ContainerApp;

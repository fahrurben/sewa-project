import { RouterProvider } from "react-router";
import routeConfig from "./route.config.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayerProvider } from "@astryxdesign/core/Layer";

const queryClient = new QueryClient();

const ContainerApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayerProvider toast={{ position: "bottomEnd" }}>
          <RouterProvider router={routeConfig}></RouterProvider>
        </LayerProvider>
      </QueryClientProvider>
    </>
  );
};

export default ContainerApp;

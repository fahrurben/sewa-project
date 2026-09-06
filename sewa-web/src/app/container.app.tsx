import { RouterProvider } from "react-router";
import routeConfig from "./route.config.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ContainerApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routeConfig}></RouterProvider>
      </QueryClientProvider>
    </>
  );
};

export default ContainerApp;

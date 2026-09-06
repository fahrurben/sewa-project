import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ContainerApp from "./app/container.app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContainerApp />
  </StrictMode>,
);

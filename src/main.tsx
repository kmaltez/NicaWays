import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/customStyles.css";
import { BrowserRouter } from "react-router-dom";

import { AppPath } from "./config";
import { AppRoutes } from "./routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={AppPath}>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Theme } from "@radix-ui/themes";
import { BlockchainProvider } from "./context/BlockchainContext"; // <-- add this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <BlockchainProvider>
        <App />
      </BlockchainProvider>
    </Theme>
  </StrictMode>
);



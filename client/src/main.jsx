import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router } from "react-router-dom";
const activeChain = "goerli";



const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
    <ThirdwebProvider
      clientId="72b6df41f7e8935dcd8d90fbecc43ef6"
      activeChain={activeChain}
    >
      <App />
      </ThirdwebProvider>
    </Router>
  </React.StrictMode>
);


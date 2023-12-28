import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found in the document.");
}

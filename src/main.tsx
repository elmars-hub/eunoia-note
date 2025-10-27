import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { ThemeProvider } from "./context/themeContext.tsx";
import { NotesProvider } from "./context/notesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </ThemeProvider>
  </React.StrictMode>
);

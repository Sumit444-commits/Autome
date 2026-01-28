import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Toaster />
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  </>,
);

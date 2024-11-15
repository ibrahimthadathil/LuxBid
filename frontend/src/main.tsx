import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { ThemeProvider } from "./components/theme/theme-provider";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persister = persistStore(store);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors position="top-right" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PersistGate persistor={persister}>
          <RouterProvider router={Router} />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

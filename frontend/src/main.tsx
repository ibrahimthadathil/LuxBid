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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./context/socketCotext";
const queryClient = new QueryClient();
let persister = persistStore(store);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Toaster richColors position="top-right" theme="dark" expand />
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SocketProvider>
        <PersistGate persistor={persister}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Router}/>
          </QueryClientProvider>
        </PersistGate>
      </SocketProvider>
    </ThemeProvider>
  </Provider>
);

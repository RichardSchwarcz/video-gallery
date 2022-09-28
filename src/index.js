import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./routes";
import { myTheme } from "./styles/chakraTheme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={myTheme}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ChakraProvider>
      <ReactQueryDevtools position="bottom-right" initialIsOpen="false" />
    </QueryClientProvider>
  </React.StrictMode>
);

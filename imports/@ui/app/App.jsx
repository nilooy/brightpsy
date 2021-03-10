import React from "react";
import Routes from "@ui/routes/Routes";
import ContextProvider from "@ui/context";
import { Windmill } from "@windmill/react-ui";
import { ToastContainer } from "react-toastify";
import theme from "./theme";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      {/* usePreferences */}
      <Windmill theme={theme}>
        <Routes />
      </Windmill>
      <ToastContainer />
    </ContextProvider>
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);

export default App;

import React, { Suspense } from "react";
import Routes from "./src/routes/Routes";
import ContextProvider from "./src/context";
import { Windmill } from "@windmill/react-ui";
import { ToastContainer, toast } from "react-toastify";
import theme from "./theme";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      {/* usePreferences */}
      <Windmill theme={theme} usePreferences>
        <Routes />
      </Windmill>
      <ToastContainer />
    </ContextProvider>
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);

export default App;

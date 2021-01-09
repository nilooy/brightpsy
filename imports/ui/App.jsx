import React, { Suspense } from "react";
import Routes from "./src/routes/Routes";
import ContextProvider from "./src/context";
import { Windmill } from "@windmill/react-ui";
import { ToastContainer, toast } from "react-toastify";

const App = () => (
  <ContextProvider>
    {/* usePreferences */}
    <Windmill usePreferences>
      <Routes />
    </Windmill>
    <ToastContainer />
  </ContextProvider>
);

export default App;

import React, { Suspense } from "react";
import Routes from "./src/routes/Routes";
import ContextProvider from "./src/context";
import ThemedSuspense from "./src/components/ui/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";

const App = () => (
  <ContextProvider>
    <Windmill usePreferences>
      <Routes />
    </Windmill>
  </ContextProvider>
);

export default App;

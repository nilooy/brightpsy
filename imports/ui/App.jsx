import React, { Suspense } from "react";
import Routes from "./src/routes/Routes";
import ContextProvider from "./src/context";
import { Windmill } from "@windmill/react-ui";

const App = () => (
  <ContextProvider>
    {/* usePreferences */}
    <Windmill usePreferences>
      <Routes />
    </Windmill>
  </ContextProvider>
);

export default App;

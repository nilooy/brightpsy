import { Meteor } from "meteor/meteor";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import { SidebarProvider } from "./src/context/SidebarContext";
import ThemedSuspense from "./src/components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
// import * as serviceWorker from './serviceWorker'

Meteor.startup(() => {
  ReactDOM.render(
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <App />
        </Windmill>
      </Suspense>
    </SidebarProvider>,
    document.getElementById("root")
  );

  // Offline support
  // serviceWorker.register()
});

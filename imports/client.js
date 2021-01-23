import React from "react";

import App from "@ui/app/App";
import { renderWithSSR } from "meteor/communitypackages:react-router-ssr";

// SSR activated

// TODO: Remove SSR as the dashboard and website will be different project and dashboard doesn't need SSRù

renderWithSSR(<App />);

import React from "react";
import App from "./ui/App";
import { renderWithSSR } from "meteor/communitypackages:react-router-ssr";

// SSR activated
renderWithSSR(<App />);
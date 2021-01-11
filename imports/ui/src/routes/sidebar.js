import { privatePath } from "./privatePath";

const routes = [
  {
    path: privatePath.dashboard, // the url
    name: "Dashboard", // name that appear in Sidebar
    icon: "HomeIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.studio, // the url
    name: "Studios", // name that appear in Sidebar
    icon: "StudioIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.packages, // the url
    name: "Pachetti", // name that appear in Sidebar
    icon: "PriceIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.profile, // the url
    name: "Profile", // name that appear in Sidebar
    icon: "PeopleIcon", // the component being exported from icons/index.js
  },
];

export default routes;

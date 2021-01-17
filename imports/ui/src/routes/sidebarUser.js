import { privatePath } from "./privatePath";

const sidebarUser = [
  {
    path: privatePath.dashboard, // the url
    name: "Dashboard", // name that appear in Sidebar
    icon: "HomeIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.profile, // the url
    name: "Profile", // name that appear in Sidebar
    icon: "PeopleIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.search, // the url
    name: "Search", // name that appear in Sidebar
    icon: "SearchIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.messages, // the url
    name: "Message", // name that appear in Sidebar
    icon: "BellIcon", // the component being exported from icons/index.js
  },
];

export default sidebarUser;

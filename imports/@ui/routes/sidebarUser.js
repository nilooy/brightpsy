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
    path: privatePath.inbox, // the url
    name: "Chat", // name that appear in Sidebar
    icon: "PeopleIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.doctor, // the url
    name: "Psicologi", // name that appear in Sidebar
    icon: "PeopleIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.appointments, // the url
    name: "Appointments", // name that appear in Sidebar
    icon: "SunIcon", // the component being exported from icons/index.js
  },
];

export default sidebarUser;

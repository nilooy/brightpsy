import { privatePath } from "./privatePath";

const sidebar = [
  {
    path: privatePath.dashboard, // the url
    name: "Dashboard", // name that appear in Sidebar
    icon: "HomeIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.packages, // the url
    name: "Pachetti", // name that appear in Sidebar
    icon: "PriceIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.accounts, // the url
    name: "Account", // name that appear in Sidebar
    icon: "MoneyIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.profile, // the url
    name: "Profile", // name that appear in Sidebar
    icon: "PeopleIcon", // the component being exported from icons/index.js
  },
  {
    path: privatePath.inbox, // the url
    name: "Chat", // name that appear in Sidebar
    icon: "PeopleIcon", // the component being exported from icons/index.js
  },
  {
    name: "Appointments", // name that appear in Sidebar
    icon: "SunIcon", // the component being exported from icons/index.js
    routes: [
      // submenu
      {
        path: privatePath.appointments,
        name: "Nouvi",
      },
      {
        path: privatePath.calender,
        name: "Calendario",
      },
    ],
  },
];

export default sidebar;

import { Fragment } from "react";

import MainLayout from "@ui/layouts/MainLayout";
import CreatePricePackage from "@ui/features/price-package/CreatePricePackage";
import EditPricePackage from "@ui/features/price-package/EditPricePackage";
import ListPricePackage from "@ui/features/price-package/ListPricePackage";
import Dashboard from "@ui/features/dashboard/Dashboard";
import Profile from "@ui/features/profile/Profile";
import UserProfileEditForm from "@ui/features/profile/UserProfileEditForm";
import ThemedSuspense from "@ui/components/Basic/ThemedSuspense";
import { privatePath, rootPath, rootPathUser } from "@ui/routes/privatePath";
import UserDashboard from "@ui/features/dashboard/UserDashboard";
import Inbox from "@ui/features/chat/Inbox";
import UserSearchPricePackage from "@ui/features/price-package/UserSearchPricePackage";
import UserSinglePricePackage from "@ui/features/price-package/UserSinglePricePackage";
import Accounts from "@ui/features/accounts/Accounts";
import PaymentSuccess from "@ui/features/payment/PaymentSuccess";
import Appointments from "@ui/features/appointments/Appointments";
import SingleAppointment from "@ui/features/appointments/SingleAppointment";

export const privateRoutes = [
  {
    layout: Fragment,
    subRoutes: [
      {
        path: rootPath,
        exact: true,
        component: ThemedSuspense, // preloader TODO
      },
    ],
  },
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: rootPath,
        exact: true,
        component: ThemedSuspense,
      },
      {
        path: privatePath.dashboard,
        exact: true,
        component: Dashboard,
      },
      {
        path: privatePath.profile,
        exact: true,
        component: Profile,
      },
      {
        path: privatePath.accounts,
        exact: true,
        component: Accounts,
      },
      {
        path: privatePath.packages,
        exact: true,
        component: ListPricePackage,
      },
      {
        path: privatePath.packagesCreate,
        exact: true,
        component: CreatePricePackage,
      },
      {
        path: privatePath.packagesEditById(),
        exact: true,
        component: EditPricePackage,
      },
      {
        path: privatePath.inbox,
        exact: true,
        component: Inbox,
      },
      {
        path: privatePath.inboxById(),
        exact: true,
        component: Inbox,
      },
      {
        path: privatePath.appointments,
        exact: true,
        component: Appointments,
      },
      {
        path: privatePath.appointmentById(),
        exact: true,
        component: SingleAppointment,
      },
    ],
  },
];

export const privateRoutesUser = [
  {
    layout: Fragment,
    subRoutes: [
      {
        path: rootPathUser,
        exact: true,
        component: ThemedSuspense, // preloader TODO
      },
    ],
  },
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: rootPath,
        exact: true,
        component: ThemedSuspense,
      },
      {
        path: privatePath.dashboard,
        exact: true,
        component: UserDashboard,
      },
      {
        path: privatePath.profile,
        exact: true,
        component: UserProfileEditForm,
      },
      {
        path: privatePath.inbox,
        exact: true,
        component: Inbox,
      },
      {
        path: privatePath.inboxById(),
        exact: true,
        component: Inbox,
      },
      {
        path: privatePath.search,
        exact: true,
        component: UserSearchPricePackage,
      },
      {
        path: privatePath.packageById(),
        exact: true,
        component: UserSinglePricePackage,
      },
      {
        path: privatePath.paymentSuccess,
        exact: true,
        component: PaymentSuccess,
      },
    ],
  },
];

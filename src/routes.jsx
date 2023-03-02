import { Home, Profile, Login, SignUp, AdminHome } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Log In",
    path: "/login",
    element: <Login />,
  },
  {
    icon: UserPlusIcon,
    name: "Sign Up",
    path: "/signup",
    element: <SignUp />,
  },
  {
    icon: UserPlusIcon,
    name: "Admin",
    path: "/admin",
    element: <AdminHome />,
  },

];

export default routes;

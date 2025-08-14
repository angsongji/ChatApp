import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PATH from "./path.js";

//layouts
import MainLayout from "../layouts/MainLayout";
import NullLayout from "../layouts/NullLayout.jsx";
import SearchUsersPage from "../pages/SearchUsersPage.jsx";

//pages
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const SignInPage = lazy(() => import("../pages/SignInPage"));
const SignUpPage = lazy(() => import("../pages/SignUpPage"));
const PrivateProfilePage = lazy(() => import("../pages/PrivateProfilePage"));

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH.PRIVATE_PROFILE,
        element: <PrivateProfilePage />,
      },
      {
        path: PATH.SEARCH_USERS,
        element: <SearchUsersPage />,
      },
    ],
  },
  {
    path: PATH.STRANGER,
    element: <NullLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: PATH.SIGNIN,
        element: <SignInPage />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;

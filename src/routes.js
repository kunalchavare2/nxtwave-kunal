import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddResource from "./pages/AddResource/AddResource";
import Resources from "./components/Organisams/Resources/Resources";
import Request from "./components/Organisams/Request/Request";
import Users from "./components/Organisams/Users/Users";
import HomeLayout from "./Layout/HomeLayout/HomeLayout";
import Layout from "./Layout/RootLayout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import GuardedRoute from "./HOC/GuardedRoute/GuardedRoute";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/home",
        element: (
          <GuardedRoute>
            <HomeLayout />
          </GuardedRoute>
        ),
        children: [
          {
            path: "/home",
            element: <Navigate to="/home/resources" />,
          },
          {
            path: "resources",
            element: <Resources />,
          },
          {
            path: "requests",
            element: <Request />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },

      {
        path: "/add-resource",
        element: <AddResource />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes, { basename: "" });

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
  },
];

const router = createBrowserRouter(routes, { basename: "/" });

export default router;

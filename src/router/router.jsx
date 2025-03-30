import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const MusicPlayerPage = lazy(() => import("../page/MusicPlayerPage"))
const ErrorPage = lazy(() => import("../page/ErrorPage"))

const router = createBrowserRouter([
   {
      path: "/",
      element: <MusicPlayerPage />,
      errorElement: <ErrorPage />
   }
])

export default router
// src/routes/AppRouter.tsx
import MainLayout from "@/layouts/MainLayout";
import MapLayout from "@/layouts/MapLayout";
import LoginLayout from "@/layouts/LoginLayout";
import SignUpLayout from "@/layouts/SignUpLayout"
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const Map = lazy(() => import("@/pages/Map"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"))

const router = createBrowserRouter([
  {
    path: "/main",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/",
    element: <MapLayout />,
    children: [{ index: true, element: <Map /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/signup",
    element: <SignUpLayout />,
    children: [{ index: true, element: <SignUp /> }],
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

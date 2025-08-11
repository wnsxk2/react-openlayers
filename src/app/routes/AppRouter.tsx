// src/routes/AppRouter.tsx
import MainLayout from "@/layouts/MainLayout";
import MapLayout from "@/layouts/MapLayout";
import LoginLayout from "@/layouts/LoginLayout";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const Map = lazy(() => import("@/pages/Map"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Auth/Login"));

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
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

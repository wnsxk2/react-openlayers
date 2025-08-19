// src/routes/AppRouter.tsx
import MainLayout from '@/shared/ui/layouts/MainLayout';
import LoginLayout from '@/shared/ui/layouts/LoginLayout';
import SignUpLayout from '@/shared/ui/layouts/SignUpLayout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FullPageLayout from '@/shared/ui/layouts/FullPageLayout';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Map = lazy(() => import('@/pages/Map'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));

const router = createBrowserRouter([
  {
    path: '/main',
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '/',
    element: <FullPageLayout />,
    children: [{ index: true, element: <Map /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/login',
    element: <LoginLayout />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/signup',
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

// src/routes/AppRouter.tsx
import MainLayout from '@/shared/ui/layouts/MainLayout';
import LoginLayout from '@/shared/ui/layouts/LoginLayout';
import SignUpLayout from '@/shared/ui/layouts/SignUpLayout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const MapPage = lazy(() => import('@/pages/map'));
const NotFound = lazy(() => import('@/pages/not-found'));
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
    element: <MapPage />,
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

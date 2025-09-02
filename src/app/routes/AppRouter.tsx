// src/routes/AppRouter.tsx
import MainLayout from '@/shared/ui/layouts/MainLayout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const MapPage = lazy(() => import('@/pages/map'));
const NotFound = lazy(() => import('@/pages/not-found'));
const LoginPage = lazy(() => import('@/pages/login'));
const SignUpPage = lazy(() => import('@/pages/sign-up'));

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
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

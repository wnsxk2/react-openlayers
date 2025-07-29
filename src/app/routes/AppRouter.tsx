// src/routes/AppRouter.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '@/shared/ui/layouts/MainLayout';
// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

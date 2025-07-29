// src/layouts/MainLayout.tsx
import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <header style={{ padding: '1rem', background: '#eee' }}>
        <nav>
          <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </>
  );
}

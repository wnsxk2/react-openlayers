import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from '@/app/providers/AuthProvider';

function App() {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ReactQueryProvider>
  );
}

export default App;

import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;

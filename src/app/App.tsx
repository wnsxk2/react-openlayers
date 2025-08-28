import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <ReactQueryProvider>
      <AppRouter />
    </ReactQueryProvider>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
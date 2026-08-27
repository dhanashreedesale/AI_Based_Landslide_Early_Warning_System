// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import RiskMapPage from './pages/RiskMapPage';
import AlertsPage from './pages/AlertsPage';
import DataSourcesPage from './pages/DataSourcesPage';
import ReportsPage from './pages/ReportsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/risk-map" element={<RiskMapPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/data-sources" element={<DataSourcesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1a1a3e',
              color: '#fff',
              border: '1px solid #2a2a5e',
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
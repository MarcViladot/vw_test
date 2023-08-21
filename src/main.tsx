import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from '@/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { initMocks } from '@/mocks';

initMocks();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

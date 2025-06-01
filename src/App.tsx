import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataForm from './components/DataForm';
import DataTable from './components/DataTable';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const handleAdd = (item: any) => {
    window.location.reload(); 
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Таблица данных
        </Typography>
        <DataForm onAdd={handleAdd} />
        <DataTable />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
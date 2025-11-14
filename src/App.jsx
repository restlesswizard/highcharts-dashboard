import React from 'react';
import { DataProvider } from './context/DataContext';
import Table from './components/Table/Table';
import './App.css';

function App() {
  return (
    <DataProvider>
      <div style={{ maxWidth: '900px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
        <Table />
      </div>
    </DataProvider>
  );
}

export default App;

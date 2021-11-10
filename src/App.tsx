import React from 'react';
import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Tree from './pages/Tree';
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Tree />
    </StyledEngineProvider>
  );
}

export default App;

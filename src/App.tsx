import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, LinearProgress, responsiveFontSizes, ThemeProvider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Nav } from './components/Nav';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Bio = lazy(() => import('./pages/Bio'));

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => responsiveFontSizes(
    createTheme({
      palette: { 
        primary: {main: '#E19B9F'},
        secondary: { main: '#CBABFA'},
        mode: false ? 'dark' : 'light' },
      typography: {
        fontFamily: 'Parisienne'
      }
    })
  ), [prefersDarkMode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              <Route path="/" element={<Nav />}>
                <Route index element={<Home />} />
                <Route path="bio" element={<Bio />} />
              </Route>
             
            </Routes>
          </Suspense>
        </>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;

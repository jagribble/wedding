import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { createTheme, CssBaseline, LinearProgress, responsiveFontSizes, ThemeProvider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Nav } from './components/Nav';
import { motion } from "framer-motion";
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Bio = lazy(() => import('./pages/Bio'));
const FAQ = lazy(() => import('./pages/FAQ'));

const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 1
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => responsiveFontSizes(
    createTheme({
      palette: { 
        primary: {main: '#E19B9F'},
        secondary: { main: '#CBABFA'},
        mode: false ? 'dark' : 'light' },
      typography: {
        fontFamily: 'Dancing Script'
        // fontFamily: "'Montserrat', sans-serif"
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
              {/* <Route element={<AnimationLayout />}> */}
              <Route path="/" element={<Nav />}>
                <Route index element={<Home />} />
                <Route path="faq" element={<FAQ />} />
              </Route>
              {/* </Route> */}

             
            </Routes>
          </Suspense>
        </>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;

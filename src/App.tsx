import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { createTheme, CssBaseline, LinearProgress, responsiveFontSizes, ThemeProvider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { Nav } from './components/Nav';
import { motion } from "framer-motion";
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
import WeddingFund from './pages/WeddingFund';

const Home = lazy(() => import('./pages/Home'));
const Bio = lazy(() => import('./pages/Bio'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ResponseForm = lazy(() => import('./pages/ResponseForm'));
const ResponseGiven = lazy(() => import('./pages/ResponseGiven'));
const CreatePeople = lazy(() => import('./pages/CreatePeople'));
const CreateRSVP = lazy(() => import('./pages/CreateRSVP'));
const Uploads = lazy(() => import('./pages/Uploads'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
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
        info: { main: '#000' },
        mode: false ? 'dark' : 'light'
      },
      typography: {
        fontFamily: 'Dancing Script'
        // fontFamily: "'Montserrat', sans-serif"
      }
    })
  ), [prefersDarkMode]);

  return (
    <BrowserRouter>
      <Auth0Provider
        domain="emmaandjules.eu.auth0.com"
        clientId="d6i0nrwBFpNr44brfFrg9SxlzfYEHeVD"
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <>
            <Suspense fallback={<LinearProgress />}>
              <Routes>
                {/* <Route element={<AnimationLayout />}> */}
                <Route path="/" element={<Nav />}>
                  <Route index element={<Home />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="honeymoon-fund" element={<WeddingFund />} />
                  <Route path="invite/:id" element={<ResponseForm />} />
                  <Route path="responded" element={<ResponseGiven />} />
                  <Route path="create" element={<CreatePeople />} />
                  <Route path="creatersvp" element={<CreateRSVP />} />
                  <Route path="uploads" element={<Uploads />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                </Route>
                {/* </Route> */}


              </Routes>
            </Suspense>
          </>
        </ThemeProvider>
      </Auth0Provider>

    </BrowserRouter>

  );
}

export default App;

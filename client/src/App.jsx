import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from 'react-ga';

import AuthProvider from "./context/auth";
import TranslateProvider from "./context/translate";
import { HomePage, CreatePage, PostPage, ProfilePage, Signup, Login } from "./pages";
import { Navbar, ProtectedRoute, RoleRoute } from "./components";

const TRACKING_ID = "G-QXCFL8LCEW"; // OUR_TRACKING_ID

const App = () => {
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <TranslateProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<RoleRoute><HomePage /></RoleRoute>}/>
            <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>}/>
            <Route path="/job/:id" element={<PostPage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            {/* AUTH */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </TranslateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

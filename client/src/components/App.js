
import './App.css';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from '../hoc/auth'

import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import VideoMainPage from './views/VideoMainPage/VideoMainPage';
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <Router>
          <NavBar />
          <div style={{ paddingTop: '69px', minHeight: '100vh' }}>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/" component = {Auth(LandingPage, null)}  />
              <Route exact path="/login" component = {Auth(LoginPage, false)} />
              <Route exact path="/register" component = {Auth(RegisterPage, false)} />
              <Route exact path="/videoList" component = {Auth(VideoMainPage, null)} />
              <Route exact path="/video/upload" component = {Auth(VideoUploadPage, true)} />
              <Route exact path="/video/:videoId" component = {Auth(VideoDetailPage, null)} />
            </Switch>
          </div>
        </Router>
      <Footer />
    </Suspense>
    
  );
}

export default App;

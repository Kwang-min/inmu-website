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
import VideoUpdatePage from './views/VideoUpdatePage/VideoUpdatePage';
import BoardMainPage from './views/BoardMainPage/BoardMainPage';
import BoardCreatePage from './views/BoardCreatePage/BoardCreatePage';
import BoardUpdatePage from './views/BoardUpdatePage/BoardUpdatePage';
import BoardDetailPage from './views/BoardDetailPage/BoardDetailPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <Router>
          <NavBar />
          <div style={{ minHeight: '100vh' }}>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/" component = {Auth(LandingPage, null)}  />
              <Route exact path="/login" component = {Auth(LoginPage, false)} />
              <Route exact path="/register" component = {Auth(RegisterPage, false)} />
              <Route exact path="/videoList" component = {Auth(VideoMainPage, null)} />
              <Route exact path="/video/upload" component = {Auth(VideoUploadPage, true)} />
              <Route exact path="/video/update/:videoId" component = {Auth(VideoUpdatePage, true)} />
              <Route exact path="/video/:videoId" component = {Auth(VideoDetailPage, null)} />
              <Route exact path="/boardList" component = {Auth(BoardMainPage, null)} />
              <Route exact path="/board/create" component = {Auth(BoardCreatePage, true)} />
              <Route exact path="/board/update/:postId" component = {Auth(BoardUpdatePage, true)} />
              <Route exact path="/board/post/:postId" component = {Auth(BoardDetailPage, null)} />
            </Switch>
          </div>
        </Router>
      <Footer />
    </Suspense>
  );
}

export default App;

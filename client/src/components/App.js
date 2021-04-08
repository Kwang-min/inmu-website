
import './App.css';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import LandingPage from './views/LandingPage/LandingPage';

function App() {
  return (
    // <Suspense fallback={(<div>Loading...</div>)}>
    //   <NavBar />
    //     <Router>
    //       <div>
    //         {/* A <Switch> looks through its children <Route>s and
    //             renders the first one that matches the current URL. */}
    //         <Switch>
    //           <Route exact path="/" component = {<LandingPage /> } />
    //           {/* <Route exact path="/login" component = {<LandingPage />} />
    //           <Route exact path="/register" component = {<LandingPage />} /> */}
    //         </Switch>
    //       </div>
    //     </Router>
    //   <Footer />
    // </Suspense>
    <div>
      <NavBar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;

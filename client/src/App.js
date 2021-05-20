import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; //  for routing
import NavBar from './components/Layout/NavBar';
import Landing from './components/Layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import './App.css';

const App=() =>
<Router>
<Fragment>
 <NavBar/>
 <Route exact path = '/'component = {Landing}/> 
<section className = 'container'>

 <Switch>
   <Route exact path = '/register' component= {Register}/>
   <Route exact path = '/login' component= {Login}/>
  
 </Switch>
 </section>
</Fragment>
</Router>

export default App

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from './components/index';
import Header from './components/header';
import Cars from './components/cars';
// import Footer from './components/footer';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <main role='main' className='container'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/cars' component={Cars} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default Routes;
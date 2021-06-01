import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './main';
import Favorites from './Pages/favorites/Favorites';

function Routes() {
  return (
    <Switch>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/favorites' component={Favorites} />
    </Switch>
  );
}

export default Routes;
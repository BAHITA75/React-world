import React from 'react';
import Home from "./pages/Home";
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    
    <BrowserRouter>
    
      <Switch>
        {/* switch teste toutes les routes, s'il trouve pas la bonne route, il va nous emmener vers l'erreur 404 (route ErrorPage) */}
        <Route exact path="/" component={Home} />
        <Route exact path="/a-propos" component={About} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;








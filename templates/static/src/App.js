import React from 'react';
import './App.css';
import {HashRouter as Router , Switch, Route} from 'react-router-dom';
import axios from 'axios';



import Home from './components/Home';
import Header from './components/Header';

class App extends React.Component {


  render(){
  return (
    <Router>
    <div className="container-fluid">

        <div className="row">
              <Header></Header>

              <main className="container-fluid shift-down">

                 <Switch >
                      <Route exact path='/' component={Home} />
                      <Route exact path='/index.html' component={Home} />

                 </Switch>

               </main>
        </div>
    </div>
  </Router>
  );
}
}

export default App;

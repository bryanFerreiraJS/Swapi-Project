import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css';
import './assets/styles/index.css';
import './assets/styles/App.css';

import App from './components/App';
import PeopleCard from './components/Card/PeopleCard';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path='/' exact component={App} />
      <Route path='/people/' component={PeopleCard} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

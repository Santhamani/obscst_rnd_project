import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router  } from 'react-router-dom'
import './index.css';
import App from './App';
// import Reacts from './React'
import{ IntlProvider} from 'react-intl'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <IntlProvider>
    <Router>
      <App />
    </Router>
    </IntlProvider>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

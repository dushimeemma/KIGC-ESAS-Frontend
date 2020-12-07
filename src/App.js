import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './Routes';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;

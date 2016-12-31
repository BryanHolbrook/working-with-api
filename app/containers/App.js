import React from 'react';
import Products from '../components/Products';
import Tweets from '../components/Tweets';

const App = () => (
  <div className="row">
    <div className="col s12 m6">
      <Products />
    </div>
    <div className="col s12 m6">
      <Tweets />
    </div>
  </div>
);

export default App;

'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'

import cameraAPI from './components/CameraAPI'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={cameraAPI}>
{/*        <IndexRedirect to="/products" />
*/}   </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)

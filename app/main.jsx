'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'

import App from './components/App'
import CameraAPI from './components/CameraAPI'
import History from './components/History'
import Buy from './components/Buy'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/play" />
        <Route path="/play" component={CameraAPI} />
        <Route path="/history" component={History} />
        <Route path="/buy" component={Buy} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)

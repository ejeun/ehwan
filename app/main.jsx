'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'

import App from './components/App'
import CameraAPI from './components/CameraAPI'
import Form from './components/New'

import {newMail} from './reducers.js'

const load = () => {
  store.dispatch(newMail({}))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={load}>
        <IndexRedirect to="/new" />
        <Route path="/new" component={Form} />
        <Route path="/play" component={CameraAPI} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('main')
)

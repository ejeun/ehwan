import React from 'react'
import {browserHistory} from 'react-router'

import {newPet} from '../reducers.js'
import {connect} from 'react-redux'

export const New = (props) => {

return (
  <form className="new" onSubmit={evt => {
    evt.preventDefault()
    props.createPet(
      evt.target.kind.value,
      evt.target.name.value
    )
    browserHistory.push('/play')
  } }>
    <span className="mdc-typography--display1">what kind of friend are you looking for?</span><br/>
    <input type="radio" name="kind" value="succulent" /><span className="mdc-typography--headline">succulent</span><br/>
    <input type="radio" name="kind" value="cat" /><span className="mdc-typography--headline">cat</span><br/>
    <span className="mdc-typography--display1">give your new friend a name</span><br/>
    <input name="name" type="name" />
    <button className="mdc-button" type="submit" value="adopt">adopt</button>
  </form>
)}

const dispatchToProps = (dispatch) => {
  return {
    createPet: (kind, name) => {
      dispatch(newPet({kind, name}))
    }
  }
}

export default connect(
                        state => ({}),
                        dispatchToProps)(New)

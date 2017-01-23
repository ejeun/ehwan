import React from 'react'

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
  } }>
    <span>what kind of friend are you looking for?</span><br/>
    <input type="radio" name="kind" value="succulent" /><span>succulent</span><br/>
    <input type="radio" name="kind" value="cat" /><span>cat</span><br/>
    <span>give your new friend a name</span><br/>
    <input name="name" type="name" />
    <input type="submit" value="adopt" />
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

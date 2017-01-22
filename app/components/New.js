import React from 'react'

import {newPet} from '../reducers.js'
import {connect} from 'react-redux'

export const New = (props) => {

return (
  <form onSubmit={evt => {
    evt.preventDefault()
    props.createPet(
      evt.target.kind.value,
      evt.target.name.value
    )
  } }>
    what kind of friend are you looking for?<br/>
    <input type="radio" name="kind" value="succulent" />succulent<br/>
    <input type="radio" name="kind" value="cat" />cat<br/>
    give your new friend a name<br/>
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

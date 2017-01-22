import React from 'react'

import {newPet} from '../reducers/pet'
import {connect} from 'react-redux'

export const New = (props) => {

return  (
  <form onSubmit={evt => {
    evt.preventDefault()
    console.log('pressed! with ', evt.target.kind.value)
    console.dir(newPet)
    newPet(
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


export default connect(state => ({}), {newPet})(New)

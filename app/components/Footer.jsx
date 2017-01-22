import React from 'react'
import {connect} from 'react-redux'

import Form from './New'

/* ----- COMPONENT ----- */

export class Footer extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="container footer">
        <div className="ascii">
          {this.props.pet.kind ?
            <div>{this.props.pet.kind}</div> :
            <div>make a new pet<br/><Form/></div> }
        </div>

        <div className="points">
          {this.props.pet.name ?
            <span>rltnship depth: {this.props.pet.points}</span> :
            <span> rltnship depth: </span>}
        </div>

        <div className="request">
          <span>current request: </span>
        </div>

      </div>
    )
  }
}

/* ----- CONTAINER ----- */

const stateToProps = (state) => {
  return {
    pet: state.pet,
  }}
const dispatchToProps = (dispatch) => {return {}}

export default connect(stateToProps, dispatchToProps)(Footer)

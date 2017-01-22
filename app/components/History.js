import React from 'react'
import {connect} from 'react-redux'


/* ----- COMPONENT ----- */

export class History extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="container">
      </div>
    )
  }
}

/* ----- CONTAINER ----- */

const stateToProps = (state) => {return {}}
const dispatchToProps = (dispatch) => {return {}}

export default connect(stateToProps, dispatchToProps)(History)

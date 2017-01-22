import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

/* ----- COMPONENT ----- */

export class Header extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="container navbar">
        <Link>  save  </Link>
        <Link>  load  </Link>
      </div>
    )
  }
}

/* ----- CONTAINER ----- */

const stateToProps = (state) => {return {}}
const dispatchToProps = (dispatch) => {return {}}

export default connect(stateToProps, dispatchToProps)(Header)

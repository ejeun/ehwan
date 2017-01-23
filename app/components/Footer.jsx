import React from 'react'
import {connect} from 'react-redux'

import Form from './New'

/* ----- COMPONENT ----- */

export class Footer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      points: 0,
    }

    this.needs = this.needs.bind(this)
    // this.pointsup = this.pointsup.bind(this)
  }

  needs(points){

    if (points < 12 && points % 2) return 'food'
    else if (!(points % 3)) return 'company'
    else if (!(points % 13)) return 'love'
    else if (!(points % 10)) return 'warmth'
    else if (!(points % 4)) return 'fresh air'
    else if (!(points % 2)) return 'something colorful'
    else if (!(points % 5)) return 'a flash from the 90s'
    else if (!(points % 7)) return 'a romantic night'

    else return 'water'
  }

  render(){
    return (
      <div className="container footer">
        <div className="ascii">
          {this.props.pet.kind ?
            <img className="pixelart" src={`./${this.props.pet.kind}.gif`} height="auto"
              width="274.83" ></img> :
            <div><span>make a new pet</span><br/><Form/></div> }
        </div>

        <div className="points">
          {this.props.pet.name ?
            <span>rltnship depth: {this.props.pet.points}</span> :
            <span> rltnship depth: </span>}
        </div>

        <div className="request">
          {this.props.pet.points ?
            <span>current request: {this.needs(this.props.pet.points)}</span>:
            <span>current request: </span>}
        </div>

      </div>
    )
  }
}

/* ----- CONTAINER ----- */

const stateToProps = (state) => {
  return {
    pet: state.pet,
    newMail: state.newMail,
    img: state.image,
  }}
const dispatchToProps = (dispatch) => {return {
}}

export default connect(stateToProps, dispatchToProps)(Footer)

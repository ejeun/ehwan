import React from 'react'
import {connect} from 'react-redux'

import {sendMail, pointsUp} from '../reducers.js'
import Footer from './Footer'
import keys from '../keys.js'

// Require the client
var Clarifai = require('clarifai')
// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  keys.CLIENT_ID,
  keys.CLIENT_SECRET
);
// app.getToken();

/* ----- COMPONENT ----- */

export class cameraAPI extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      files: {},
      imgURL: '',
      error: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    // console.log('change')
    this.setState({
      files: e.target.files,
    })

    var files = e.target.files,
        file;
    if (files && files.length > 0) {
      file = files[0];

      try {
        // Get window.URL object
        var URL = window.URL || window.webkitURL;
        // console.log(file)
        this.setState({
          imgURL: URL.createObjectURL(file)
        })

        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          let imgBytes = fileReader.result.split(',')[1]
          // console.log(imgBytes)

          app.models.predict(Clarifai.GENERAL_MODEL, imgBytes)
          .then(response => {
              const predictions = response.outputs[0].data.concepts

              let tags = [];

              predictions.forEach(function(guess){
                if (guess.value > 0.85 &&
                    guess.name !== 'no person'
                  && guess.name !== 'one') {
                  tags.push(guess.name)
                }
              })

              if (tags.length > 7) {
                tags.splice(7)
              }

              this.props.send(this.state.imgURL, tags, this.props.pet)
            },
            function(err) {
              console.error(err);
            }
          )
        }
      }
      catch (err) {
        try {
          // Fallback if createObjectURL is not supported
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
            this.setState({
              imgURL: event.target.result,
            })
          };
          fileReader.readAsDataURL(file);
        }
        catch (err) {
          // Display error message
          this.setState({
            error: 'Neither createObjectURL or FileReader are supported',
          })
        }
      }
    }
  }


  render(){
    return (
      <div className="container">

        <section className="main-content">
          <p className="mdc-typography--display1">adopt a pet and care for it by sending it photos through your camera</p>

          <input
            type="file"
            id="take-picture"
            accept="image/*"
            onChange={this.handleChange}
          ></input>

          {this.props.pet.name ?
            <span className="mdc-typography--body1">last sent to {this.props.pet.name}: </span> :
            <span>you don't have a pet yet! click the x below to adopt one</span>}
          <div>
            <img
              id="show-picture"
              className="img-responsive"
              src={this.state.imgURL}
              height="auto"
              width="300"
              ></img>
          </div>

          <span className="mdc-typography--body1"> {this.props.newMail.tags && this.props.newMail.tags.map(function(tag, i){
            return (
              <div className="tags" key={i}>{tag}</div>)
          })}</span>

          <p>{this.state.error}</p>
        </section>
        <Footer />
      </div>
    )
  }
}

/* ----- CONTAINER ----- */

const stateToProps = (state) => {
  return {
    pet: state.pet,
    newMail: state.newMail,
}}

const dispatchToProps = (dispatch) => {
  return {
    send: (url, tags, pet) => {
      let points = pet.points + Math.ceil(Math.random() * 7)
      dispatch(sendMail({url, tags, petId: pet.id}))
      dispatch(pointsUp(pet.id, points))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(cameraAPI)

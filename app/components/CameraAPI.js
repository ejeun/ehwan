import React from 'react'
import {connect} from 'react-redux'

// Require the client
var Clarifai = require('clarifai')
// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'T1yVBDD72ivYXvG5z9vRAOgVO6oTNe9GqrxOa_7a',
  'Ogrj5UnJGRttrWOxPhZ07ROEdpzvN07d11sPfiSc'
)

export class cameraAPI extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      files: {},
      imgURL: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({
      files: e.target.files,
      imgURL: '',
    })

    console.log('added picture', this.state, e)

    var files = e.target.files,
        file;
    if (files && files.length > 0) {
      file = files[0];

      try {
        // Get window.URL object
        var URL = window.URL || window.webkitURL;

        // Create ObjectURL
        this.setState({
          imgURL: URL.createObjectURL(file)
        })

        // console.log(this.state)

        // // Revoke ObjectURL after image has loaded
        // showPicture.onload = function() {
        //   URL.revokeObjectURL(imgURL);
        // };

        app.models.predict(Clarifai.GENERAL_MODEL, this.state.imgURL).then(
          function(response) {

            const predictions = response.outputs[0].data.concepts
            let tags = []

            predictions.forEach(function(guess){
              if (guess.value > 0.85){ tags.push(guess.name) }
            })

            // const data = response.outputs[0].data.concepts.slice(0, 5)
            // console.log('predictions" ', predictions)
            console.log(tags);
          },
          function(err) {
            console.error(err);
          }
        );

      }
      catch (e) {
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
        catch (e) {
          // Display error message
          var error = document.querySelector("#error");
          if (error) {
              error.innerHTML = "Neither createObjectURL or FileReader are supported";
          }
        }
      }
    }

  }

  render(){
    return (
      <div className="container">
        <h1>Camera API</h1>
        <section className="main-content">
          <p>A demo of the Camera API, currently implemented in Firefox and Google Chrome on Android. Choose to take a picture with your device's camera and a preview will be shown through createObjectURL or a FileReader object (choosing local files supported too).</p>

          <p>
            <input
              type="file"
              id="take-picture"
              accept="image/*"
              onChange={this.handleChange}
            ></input>
          </p>

          <h2>Preview:</h2>
          <p>
            <img src={this.state.imgURL} alt="" id="show-picture"></img>
          </p>

          <p id="error"></p>
        </section>
      </div>
    )
  }

}

const stateToProps = (state) => {return {}}
const dispatchToProps = (dispatch) => {return {}}

export default connect(stateToProps, dispatchToProps)(cameraAPI)

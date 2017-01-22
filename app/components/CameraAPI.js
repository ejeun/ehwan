import React from 'react'
import {connect} from 'react-redux'

// Require the client
var Clarifai = require('clarifai')
// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'T1yVBDD72ivYXvG5z9vRAOgVO6oTNe9GqrxOa_7a',
  'Ogrj5UnJGRttrWOxPhZ07ROEdpzvN07d11sPfiSc'
)

/* ----- COMPONENT ----- */

export class cameraAPI extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      files: {},
      imgURL: '',
      tags: [],
      error: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    console.log(this.state)

    this.setState({
      files: e.target.files,
    })
    let concepts;
    // console.log('added picture', this.state)

    var files = e.target.files,
        file;
    if (files && files.length > 0) {
      file = files[0];

      try {
        // Get window.URL object
        var URL = window.URL || window.webkitURL;

        // console.log(this.state)

        // // Revoke ObjectURL after image has loaded
        // showPicture.onload = function() {
        //   URL.revokeObjectURL(imgURL);
        // };
        // Create ObjectURL
        this.setState({
          imgURL: URL.createObjectURL(file)
        })

        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = function(){

          let imgBytes = fileReader.result.split(',')[1]
          // console.log(imgBytes)

          app.models.predict(Clarifai.GENERAL_MODEL, imgBytes)
          .then(
            function(response) {
              const predictions = response.outputs[0].data.concepts

              let tags = [];

              predictions.forEach(function(guess){
                if (guess.value > 0.85) {
                  tags.push(guess.name)
                }
              })

              tags = tags.filter(function(word){
                return (
                  word !== 'no person'
                  && word !== 'one'
                )
              })

              console.log('setting the state with ', tags)

              this.setState({
                imgURL: URL.createObjectURL(file),
                tags: concepts,
              })
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
          <p>show your pet some love by fulfilling its requests through the cybernet</p>

          <p>
            <input
              type="file"
              id="take-picture"
              accept="image/*"
              onChange={this.handleChange}
            ></input>
          </p>

          <div>last sent: </div>
          <div>
            <img
              id="show-picture"
              className="img-responsive"
              src={this.state.imgURL}
              alt=""
              height="300"
              width="300"
              ></img>
          </div>

          <span>what the pet recieved: {this.state.tags && this.state.tags.forEach(function(tag){
            return (
              <div>{tag}</div>)
          })}</span>

          <p>{this.state.error}</p>
        </section>
      </div>
    )
  }
}

/* ----- CONTAINER ----- */

const stateToProps = (state) => {return {}}
const dispatchToProps = (dispatch) => {return {}}

export default connect(stateToProps, dispatchToProps)(cameraAPI)

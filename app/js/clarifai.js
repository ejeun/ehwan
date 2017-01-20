var fs = require('fs')

// Require the client
var Clarifai = require('clarifai')

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'T1yVBDD72ivYXvG5z9vRAOgVO6oTNe9GqrxOa_7a',
  'Ogrj5UnJGRttrWOxPhZ07ROEdpzvN07d11sPfiSc'
)

/*// You can also use the client directly in your browser:
<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>
<script>
  var app = new Clarifai.App(
    'T1yVBDD72ivYXvG5z9vRAOgVO6oTNe9GqrxOa_7a',
    'Ogrj5UnJGRttrWOxPhZ07ROEdpzvN07d11sPfiSc'
  );
</script>
*/

/*// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
  function(response) {

    const predictions = response.outputs[0].data.concepts
    let tags = []

    predictions.forEach(function(guess){
      if (guess.value > 0.83){ tags.push(guess.name) }
    })

    // const data = response.outputs[0].data.concepts.slice(0, 5)
    // console.log('predictions" ', predictions)
    // console.log(tags);
  },
  function(err) {
    console.error(err);
  }
);*/
var vangogh = './vangogh.jpg'
var base64Image;

fs.readFile(vangogh, (err, data) => {
  // fs.writeFile(image, data, function(err) {});
  base64Image = data.toString('base64');
  // console.log(base64Image)
  if (err) { console.error('error reading file', err)}
});

// predict the contents of an image by passing in bytes of one image
app.models.predict(Clarifai.GENERAL_MODEL, {base64: base64Image}).then(
  function(response) {

    console.log(response)

    // const predictions = response.outputs[0].data.concepts
    // let tags = []

    // predictions.forEach(function(guess){
    //   if (guess.value > 0.83){ tags.push(guess.name) }
    // })

    // const data = response.outputs[0].data.concepts.slice(0, 5)
    console.log('predictions" ', predictions)
    console.log(tags);
  },
  function(err) {
    console.error(err);
  }
);


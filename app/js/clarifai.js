// Require the client
var Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'T1yVBDD72ivYXvG5z9vRAOgVO6oTNe9GqrxOa_7a',
  'Ogrj5UnJGRttrWOxPhZ07ROEdpzvN07d11sPfiSc'
);

/*// You can also use the client directly in your browser:
<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>
<script>
  var app = new Clarifai.App(
    'T1yVBDD72ivYXvG5z9vRAOgVO6oTNe9GqrxOa_7a',
    'Ogrj5UnJGRttrWOxPhZ07ROEdpzvN07d11sPfiSc'
  );
</script>
*/

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
  function(response) {
    console.log(response.outputs);
  },
  function(err) {
    console.error(err);
  }
);


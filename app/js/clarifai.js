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
app.models.predict(Clarifai.GENERAL_MODEL, 'http://localhost:8000/9de6a09b-abb1-4d67-94ca-f11d59ae505f').then(
  function(response) {
    const data = response.outputs[0].data.concepts.slice(0, 5)
    console.log(data);
  },
  function(err) {
    console.error(err);
  }
);


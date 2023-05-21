const express = require('express');
const app = express();
const { callVerifyImages } = require('./grpcClient');

app.get('/greet/:name', (req, res) => {

    // ! Get the Images paths in the body of the request
    // ! Thats not really the case, we have to manually get the file(s) from the request
    // ! Then store the files on the server.
    // * Get the paths of the files to pass on to the request

    // FIXME: Dummy code!
    let img_paths = req.body.images

    callVerifyImages(img_paths, prediction => {
        // For now, we are just logging the prediction, but we need to return to process.
        console.log(prediction)
        return prediction
    })
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')


const pkgDef = protoLoader.loadSync('../proto/server.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const verifierProto = grpc.loadPackageDefinition(pkgDef)

const client = new verifierProto.verification.Ben_Verification(
    'localhost:50051',
    grpc.credentials.createInsecure()
)



function callVerifyImages(images, cb) {
    // Create the verification request with the images paths
    const request = { images: images }

    let res = client.VerifyImages(request, (err, response) => {
        if (err) {
            // Console log the error!
            console.error(err)
            return null
        }

        // I assume the callback is where you handld the predictions.
        // It would be better to return the predictions to the caller API to handle, 
        // rather than send a func to handle here
        // console.log(response)

        // Extract the predictions from the response
        const predictions = {};
        for (const [imagePath, prediction] of Object.entries(response.preds)) {
            predictions[imagePath] = {
                incidents: prediction.incidents,
                places: prediction.places
            };
        }

        return cb(predictions)
    })
}

images = [
    'test_images/earthquake.jpg',
    'test_images/fire.jpg',
    'test_images/flood.jpg',
    'test_images/ship.jpg'
]



module.exports = { callVerifyImages }
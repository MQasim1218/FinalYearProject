const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')


const pkgDef = protoLoader.loadSync('../BeneficiaryVerification/proto/server.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

// const verifierProto = grpc.loadPackageDefinition(pkgDef)

// const client = new verifierProto.verification.Ben_Verification(
//     'localhost:50051',
//     grpc.credentials.createInsecure()
// )


function init_srv() {
    let request = {}
    client.InitSrv(request, () => { })
}


async function callVerifyImages(images) {

    return new Promise((resolve, reject) => {
        const request = { images: images }
        client.VerifyImages(request, (err, response) => {
            if (err) {
                // Console log the error!
                console.error(err)
                reject(err)
            } else {
                const predictions = {};
                for (const [imagePath, prediction] of Object.entries(response.preds)) {
                    predictions[imagePath] = {
                        incidents: prediction.incidents,
                        places: prediction.places
                    };
                }
                resolve(predictions)
            }
        })
    })
    // Create the verification request with the images paths
}

images = [
    'test_images/earthquake.jpg',
    'test_images/fire.jpg',
    'test_images/flood.jpg',
    'test_images/ship.jpg'
]



module.exports = {
    callVerifyImages,
    init_srv
}
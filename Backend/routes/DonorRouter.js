const express = require('express')
const DonorModel = require('../Models/DonorModel')
let router = express.Router()

router.post('/signup', async (req, res, next) => {
    let donor = await DonorModel.find({ email: req.body.email }).exec()
    if (!donor) {
        console.log("No donor with the given Email exists!!")
        console.log("Creating a donor now!!")
        DonorModel.create(req.body)
            .then(function (data) {
                console.log(data)
                res.status(200)
                res.json(data)
            }).catch((err) => { console.log(err) })
    } else {

        res.status(500).send(donor)
    }
})

router.get('/:id', (req, res, next) => {
    DonorModel.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})

router.get('/allDonors', function (req, res, next) {
    DonorModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});

router.delete('/:id', function (req, res, next) {
    DonorModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})

module.exports = router
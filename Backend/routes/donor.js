const express = require('express')
const DonorModel = require('../Models/DonorModel')
let router = express.Router()

router.post('/add', (req, res, next) => {
    DonorModel.create(req.body)
        .then(function (data) {
            console.log(data)
            res.status(200)
            res.json(data)
        }).catch((err) => { console.log(err) })
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

router.get('/', function (req, res, next) {
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
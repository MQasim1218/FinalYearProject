const express = require('express')
const BeneficiaryModel = require('../Models/BenificiaryModel')
let router = express.Router()

router.post('/add', (req, res, next) => {
    BeneficiaryModel.find({
        "name": req.params.id
    })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})

router.get('/:id', (req, res, next) => {
    BeneficiaryModel.find({
        "name": req.params.id
    })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})

router.get('/', function (req, res, next) {
    BeneficiaryModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});
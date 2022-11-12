const express = require('express')
const AdminModel = require('../Models/AdminModel')
let router = express.Router()

router.post('/add', (req, res, next) => {
    AdminModel.create(req.body)
        .then(function (data) {
            console.log(data)
            res.status(200)
            res.json(data)
        }).catch((err) => { console.log(err) })
})

router.get('/:id', (req, res, next) => {
    AdminModel.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})

router.get('/', function (req, res, next) {
    AdminModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});

router.delete('/:id', function (req, res, next) {
    AdminModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})

/**
 * Create Campaign
 * Update Campaign
 * Delete Campaign
 * 
 */

module.exports = router
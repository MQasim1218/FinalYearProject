const AuditModel = require("../Models/AuditModel")

router.get("/all", async (req, res, next) => {
    try {
        let audits = await AuditModel.find({}).exec()
        res.json(audits)
    } catch (error) {
        console.log("NOt able to RetrIeve audits data")
        res.send("cannot send data due to error: ", error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        let audit = await AuditModel
            .find({ _id: req.params.id })
            .exec()
        res.json(audit)
    } catch (error) {
        console.log("NOt able to RetrIeve donations data")
        res.send("cannot send data due to error: ", error)
    }
})

router.post("/:id", async (req, res, next) => {
    try {
        let Audit = await AuditModel.create(req.body).exec()
        res.json(Audit)
    } catch (error) {
        console.log("Not able to create Audit")
        res.send("cannot create donation due to error: ", error.message)
    }
})

router.patch("/:id", async (req, res, next) => {

    // FIXME: Should anyone be allowed to edit/patch audits
    // try {
    //     let affirm = await AuditModel.findOneAndUpdate(
    //         { _id: req.params.id },
    //         req.body
    //     ).exec()
    //     res.json(affirm)
    // } catch (error) {
    //     console.log("Not able to update Audit data!! Err: ", error.message)
    //     res.send("cannot update data due to error: ", error.message)
    // }
})


router.get("/:month/", async (req, res, next) => {

    try {
        // let mon = today.getMonth() :: No need as we are getting this from the front end.
        let year = (new Date()).getFullYear()
        let sm = new Date(year, req.params.month, 1)
        let em = new Date(year, mon, 31).toISOString()

        let dons = AuditModel.find({
            createdAt: {
                $lte: em,
                $gte: sm
            }
        })

        res.json(dons)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }


})


router.get("/recent", async (req, res, next) => {
    try {
        let audits = AuditModel.aggregate({
            $sort: { createdAt: -1 },
        }).limit(10)

        res.json(audits)
    } catch (error) {
        console.log("Error occured while fetching recent donations!! Err: ", error.message)
        res.send(error.message)
    }
})
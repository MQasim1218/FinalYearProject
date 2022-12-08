const authorize = async (req, res, next) => {
    let auth = req.headers.authorization
    // console.log("auth: ", auth)
    if (auth == null) {
        console.log("No token recieved in the header!!")
        return res.status(401).send("You are not authenticated!!")
    }
    let token = auth.split(' ')[1]
    try {
        let jwtPayload = jwt.verify(token, "Secret")
        let { id } = jwtPayload
        if (id == null) {
            console.log("The User is not logged in!!")
            res.status(404).json({ User: null })
        }
        req.user = await userModel.findById(id).exec()
        next()
    } catch (error) {
        console.log("Token verification failed")
        res.send("Token unrecognized")
    }
}

module.exports = authorize
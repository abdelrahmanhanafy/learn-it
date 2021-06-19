module.exports = (asyFunction) => (req, res, next) => {
    asyFunction(req, res, next).catch((err) => {
        return res.status(400).json({error:err})
    })
}
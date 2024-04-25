const { warSchema } = require("../models/war")
const asyncHandler = require('express-async-handler')

const getWar = asyncHandler(async (req, res) => {
    let war = await warSchema.findOne({
        where: { id: req.params.id }
    })
    res.status(200).json({ data: war })
})

const getWars = asyncHandler(async (req, res) => {
    let war = await warSchema.findAll()
    res.status(200).json({ data: war })
})

module.exports = {getWar, getWars}
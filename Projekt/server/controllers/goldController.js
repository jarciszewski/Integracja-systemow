const { goldSchema } = require("../models/gold")
const asyncHandler = require('express-async-handler')
const jsonfile = require("jsonfile")

const getGold = asyncHandler(async (req, res) => {
    let gold = await goldSchema.findOne({
        where: { id: req.params.id }
    })
    res.status(200).json({ data: gold })
})

const getGolds = asyncHandler(async (req, res) => {
    let gold = await goldSchema.findAll()
    res.status(200).json({ data: gold })
})

module.exports = { getGold, getGolds }
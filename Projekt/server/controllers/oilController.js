const { oilSchema } = require("../models/oil")
const asyncHandler = require('express-async-handler')
const jsonfile = require("jsonfile")

const getOil = asyncHandler(async (req, res) => {
    let oil = await oilSchema.findOne({
        where: { id: req.params.id }
    })
    res.status(200).json({ data: oil })
})

const getOils = asyncHandler(async (req, res) => {
    let oil = await oilSchema.findAll()
    res.status(200).json({ data: oil })
})

module.exports = { getOil, getOils }
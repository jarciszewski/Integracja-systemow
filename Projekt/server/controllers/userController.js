const { userSchema } = require('../models/user')
const bcrypt = require("bcrypt")
const asyncHandler = require('express-async-handler')

const getUser = asyncHandler(async (req, res) => {
    const user = await userSchema.findByPk(req.params.id)

    res.status(200).json({ data: user })
})

const updateUser = asyncHandler(async (req, res) => {
    let user = await userSchema.findByPk(req.params.id);

    if (!user) {
        res.status(500).send({ message: "No user found" })
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    user = await userSchema.findByIdAndUpdate(req.params.id, { ...req.body, password: hashPassword }, { new: true, runValidators: true });

    res.status(201).json({ data: user })
})

const deleteUser = asyncHandler(async (req, res) => {
    let user = await userSchema.findByPk(req.params.id);

    if (!user) {
        res.status(500).send({ message: "No user found" })
    }

    await userSchema.destroy({where: {id: user.id}});

    res.status(200).json({ data: {} })
})

module.exports = { getUser, updateUser, deleteUser }
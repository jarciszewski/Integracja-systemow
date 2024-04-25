const router = require("express").Router()
const { userSchema, validate } = require("../models/user")
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt")
const usersController = require('../controllers/userController')

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await userSchema.findOne({where: { email: req.body.email }})
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new userSchema({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.route('/:id')
    .get(usersController.getUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router
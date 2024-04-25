require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { sequelize } = require("./db")
const db = require("./db")
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const goldRoutes = require("./routes/golds")
const warRoutes = require("./routes/wars")
const oilRoutes = require("./routes/oils")

app.use(express.json())
app.use(cors())

const port = process.env.PORT
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/gold", goldRoutes)
app.use("/api/wars", warRoutes)
app.use("/api/oil", oilRoutes)
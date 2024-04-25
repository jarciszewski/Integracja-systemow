const { sequelize, Sequelize } = require("../db")
const jsonfile = require("jsonfile")
const fs = require('fs')
const xmlReader = require("xml-reader")
const xmlQuery = require("xml-query")

const warSchema = sequelize.define("Wars", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    start: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    end: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

let warsXML = fs.readFileSync("../mysql/wars.xml", 'utf-8')
const ast = xmlReader.parseSync(warsXML)

async function loadWarsDataXML() {
    let i = 0
    xmlQuery(ast).find("name").each(node => {i++})
    for (var j = 0; j < i; j++) {
        var nameInsert = xmlQuery(ast).find("name").children().get(j).value,
            startInsert = xmlQuery(ast).find("start").children().get(j).value
        if (xmlQuery(ast).find("end").children().get(j).value === "present") {
            endInsert = 2023
        } else {
            endInsert = xmlQuery(ast).find("end").children().get(j).value
        }
        warSchema.queryInterface.bulkInsert('wars', [{
            name: nameInsert,
            start: startInsert,
            end: endInsert
        }], { ignoreDuplicates: true })
    }
}
// loadWarsDataXML()

let warJSON = jsonfile.readFileSync("../mysql/wars.json")
async function loadWarData() {
    for (var i = 0; i < warJSON.length; i++) {
        var nameInsert = warJSON[i].name,
            startInsert = warJSON[i].start
        if (warJSON[i].end === "present") {
            endInsert = 2023
        } else {
            endInsert = warJSON[i].end
        }

        await warSchema.queryInterface.bulkInsert('wars', [{
            name: nameInsert,
            start: startInsert,
            end: endInsert
        }], { ignoreDuplicates: true })
    }
}
loadWarData()

module.exports = { warSchema }
const { sequelize, Sequelize } = require("../db")
const jsonfile = require("jsonfile")
const fs = require('fs')
const xmlReader = require("xml-reader")
const xmlQuery = require("xml-query")

const oilSchema = sequelize.define("Oil", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}, {
    timestamps: false
})

let oilXML = fs.readFileSync("../mysql/oil.xml", 'utf-8')
const ast = xmlReader.parseSync(oilXML)
async function loadOilDataXML() {
    let i = 0
    xmlQuery(ast).find("date").each(node => {
        var dateInsert = xmlQuery(ast).find("date").children().get(i).value,
            priceInsert = xmlQuery(ast).find("price").children().get(i).value
        // console.log(xmlQuery(ast).find("date").children().get(i).value + " " + xmlQuery(ast).find("price").children().get(i).value)
        oilSchema.queryInterface.bulkInsert('oil', [{
            date: dateInsert,
            price: priceInsert
        }], { ignoreDuplicates: true })
        i++
    })
}
// loadOilDataXML()

let oilJSON = jsonfile.readFileSync("../mysql/oil.json")
async function loadOilData() {
    for (var i = 0; i < oilJSON.length; i++) {
        var dateInsert = oilJSON[i].date,
            priceInsert = oilJSON[i].price
        // console.log(oilJSON[i].date + " " + oilJSON[i].price)
        await oilSchema.queryInterface.bulkInsert('oil', [{
            date: dateInsert,
            price: priceInsert
        }], { ignoreDuplicates: true })
    }
}
// loadOilData()

module.exports = { oilSchema }
const { sequelize, Sequelize } = require("../db")
const jsonfile = require("jsonfile")
const fs = require('fs')
const xmlReader = require("xml-reader")
const xmlQuery = require("xml-query")

const goldSchema = sequelize.define("Gold", {
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

let goldXML = fs.readFileSync("../mysql/gold.xml", 'utf-8')
const ast = xmlReader.parseSync(goldXML)
async function loadGoldDataXML() {
    let i = 0
    xmlQuery(ast).find("date").each(node => {
        var dateInsert = xmlQuery(ast).find("date").children().get(i).value,
            priceInsert = xmlQuery(ast).find("price").children().get(i).value
        goldSchema.queryInterface.bulkInsert('gold', [{
            date: dateInsert,
            price: priceInsert
        }], { ignoreDuplicates: true })
        i++
    })
}
loadGoldDataXML()

let goldJSON = jsonfile.readFileSync("../mysql/gold.json")
async function loadGoldData() {
    for (var i = 0; i < goldJSON.length; i++) {
        var dateInsert = goldJSON[i].date,
            priceInsert = goldJSON[i].price
        await goldSchema.queryInterface.bulkInsert('gold', [{
            date: dateInsert,
            price: priceInsert
        }], { ignoreDuplicates: true })
    }
}
// loadGoldData()

module.exports = { goldSchema }
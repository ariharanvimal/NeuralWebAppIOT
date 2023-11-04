const application = {
    PORT: 5000
}
const dataBase = {
    url: "mongodb://localhost:27017/",
    NeuralOrganics: "NeuralOrganicsiot",
}

const sqldatabase = {
    path: '/WebIOTApplication/Backend/Application/DataBase Operation/SQLDATABASE/',
    dbName: 'NeuralOrganicsIOT.db',
    tableName: 'NerualOrganicsIotData'
}

module.exports = {
    application, dataBase, sqldatabase
}

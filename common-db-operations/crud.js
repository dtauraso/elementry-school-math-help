const db = require('../config/dbConfig')

module.exports = {

}

// crud
function getAll(table) {
    return db(table)
        .select('*')
}
function getById(id, table) {
    
}
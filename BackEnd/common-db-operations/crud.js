const db = require('../config/dbConfig')

module.exports = {

    getAll,
    getOneByFilter,
    getAllByFilter,
    make,
    updateById,
    removeById
}

// Universal CRUD operations
function getAll(table) {
    return db(table)
        .select('*');
}
function getOneByFilter(filter, table) {
    return db(table)
        .where(filter)
        .first();
}
function getAllByFilter(filter, table) {
    return db(table)
        .where(filter);
}
//  function getById(id, table) {
//     return db(table)
//         .where({ id })
//         .first();
// }
function make(newObject, table) {
    return db(table)
        .insert(newObject)
        .then(([id]) => getByFilter({ id }, table))
        .catcH(err => console.log(err))
}
function updateById(id, body, table) {
    return db(table)
        .where({ id })
        .update(body);
}
function removeById(id, table) {
    return db(table)
        .where({ id })
        .delete()
}
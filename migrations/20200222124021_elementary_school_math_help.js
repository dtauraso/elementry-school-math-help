
exports.up = function(knex) {
  
    return knex.schema
        .createTable("users")
};

exports.down = function(knex) {
  
};

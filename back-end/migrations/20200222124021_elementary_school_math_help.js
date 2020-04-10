
exports.up = function(knex) {
  // https://stackoverflow.com/questions/20619211/difference-between-cascade-and-restrict-sql-ddl-database/42774793
    return knex.schema
        // .createTable('users', tbl => {
        //     tbl.increments();
        //     tbl
        //         .string('username', 128)
        //         .notNullable()
        //         .unique();
        //     tbl.string('password', 128).notNullable();


        // })
        .createTable('records', tbl => {
            tbl.increments();
            // day string
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
            tbl
                .integer('howManyCorrect')
                .unsigned()
                .notNullable();
            tbl
                .integer('howManyAttempted')
                .unsigned()
                .notNullable();
            
        })
        .createTable('problemsTried', tbl => {
            tbl.increments();
            tbl
            .integer('recordId')
            .unsigned()
            .references('id')
            .inTable('records')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
            .defaultTo(null);
            tbl
                .string('expression', 255)
                .notNullable();
            // they have to have gotten it right on their first attempt for this to say true
            tbl
                .boolean('isRight');
            // their first answer will be recorded
            tbl
                .integer('theirAnswer');
            tbl
                .integer("actualAnswer");
            tbl
                .enu('kindOfOperation', [
                'Add',
                'Subtract',
              ]);

        })


    
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('problemsTried')
        .dropTableIfExists('records')
        .dropTableIfExists('users');
};

// table for records 1 entry per day
// id
// day string
// how many correct int
// how many attempted int

// table for problems tried
// id
// record_id maps to daily records id
// expression string
// wasRight boolean
// kind of operation (add, subtract, decimal values) enum

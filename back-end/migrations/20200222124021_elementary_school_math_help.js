
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

        // problem set table: Array(5)
        // 0: {a: 4, b: 3, theirAnswer: 5, actualAnswer: 7, gotItRightTheFirstTime: false}
        // 1: {a: 5, b: 6, theirAnswer: 6, actualAnswer: 11, gotItRightTheFirstTime: false}
        // 2: {a: 2, b: 4, theirAnswer: 6, actualAnswer: 6, gotItRightTheFirstTime: true}
        // 3: {a: 9, b: 4, theirAnswer: 13, actualAnswer: 13, gotItRightTheFirstTime: true}
        // 4: {a: 5, b: 1, theirAnswer: 6, actualAnswer: 6, gotItRightTheFirstTime: false}
        // length: 5
        // __proto__: Array(0)
        // problem sets table:
        // nameOfProblemSet: "problem set 0"
        // numberCorrect: 2
        // totalProblems: 5
        // __proto__: Object
        // __proto__: Object
        // })
        // problem sets
        .createTable('problemSets', tbl => {
            tbl.increments();
            tbl.string('nameOfProblemSet', 255)
                .notNullable();
            tbl
                .integer('numberCorrect')
                .unsigned()
                .notNullable();
            tbl
                .integer('totalProblems')
                .unsigned()
                .notNullable();
            
        })
        // probem set
        .createTable('problemSet', tbl => {
            tbl.increments();
            tbl
            .integer('problemSetId')
            .unsigned()
            .references('id')
            .inTable('problemSets')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
            tbl
                .integer('a')
                .notNullable();
            tbl
                .integer('b')
                .notNullable();
            tbl
                .integer('theirAnswer')
                .notNullable()
            tbl
                .integer('actualAnswer')
                .notNullable()
            tbl
                .boolean('gotItRightTheFirstTime')
                .notNullable()
            // they have to have gotten it right on their first attempt for this to say true
            // tbl
            //     .enu('kindOfOperation', [
            //     'Add',
            //     'Subtract',
            //   ]);

        })


    
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('problemSet')
        .dropTableIfExists('problemSets')
        // .dropTableIfExists('users');
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

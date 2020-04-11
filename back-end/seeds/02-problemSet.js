
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('problemSet').del()
    .then(function () {
      // Inserts seed entries
      return knex('problemSet').insert([
        {id: 0, problemSetId: 0, a: 4, b: 3, theirAnswer: 5, actualAnswer: 7, gotItRightTheFirstTime: false},
        {id: 1, problemSetId: 0, a: 5, b: 6, theirAnswer: 6, actualAnswer: 11, gotItRightTheFirstTime: false},
        {id: 2, problemSetId: 0, a: 2, b: 4, theirAnswer: 6, actualAnswer: 6, gotItRightTheFirstTime: true},
        {id: 3, problemSetId: 0, a: 9, b: 4, theirAnswer: 13, actualAnswer: 13, gotItRightTheFirstTime: true},
        {id: 4, problemSetId: 0, a: 5, b: 1, theirAnswer: 6, actualAnswer: 6, gotItRightTheFirstTime: false},

      ]);
    });
};

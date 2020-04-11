
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('problemSets').del()
      .then(function () {
        // Inserts seed entries
        return knex('problemSets').insert([
          {id: 0, nameOfProblemSet: "problem set 0", numberCorrect: 2, totalProblems: 5},
        ]);
      });
  };
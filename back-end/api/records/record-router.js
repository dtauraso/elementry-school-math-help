
// put CRUD routes for the user here
const router = require('express').Router();
const ourCrud = require('../../common-db-operations/crud')
function compareFunction(item_i, item_j){
    return item_i.orderId - item_j.orderId 
}

// fix using:
// https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
// console.log('here')
// gets problems to diplay them to the user so they can see their results for all the attempts of all the problem sets
// it could be the same problem set reattempted if they didn't get enough right
router.get('/', async (req, res, next) => {

    let problemSets = await ourCrud.getAll('problemSets').catch((err) => { res.status(500).json({}) });

    console.log(problemSets)
    if(problemSets.length === 0) {
        res.status(500).json({})
    } else {
        let myProblems = problemSets.map(async (problemSetSummary) => {

            let problems = await ourCrud.getAllByFilter({problemSetId: problemSetSummary.id}, 'problemSet')
                                        .catch((err) => { res.status(500).json({}) })
            problems = problems.sort(compareFunction)
            return problems
    
        })

        let problems = await Promise.all(myProblems).then(problems => problems)
        
        res.status(200).json({
            problemSets: problemSets,
            problems: problems
        })
    }
})

// router.get('/:problemSetId')
// for posting the problems the user answered
router.post('/', async (req, res) => {
    // console.log(req.body)
    let problemSet = req.body['problem sets table']
    console.log(problemSet)
    console.log(req.body['problem set table'])

    // I might be running too many promises at once

    let ourInsertedProblemSetRow = await ourCrud.make(problemSet, 'problemSets')
                                            .catch((err) => { res.status(500).json({}) })
    console.log(ourInsertedProblemSetRow)
    let problemId = ourInsertedProblemSetRow.id


    // this is adding them in at different times
    // maybe should store the original order as they get added so the original order can be obtained for display
    req.body['problem set table'].forEach( async (problem, i) => {

        let problemToInsert = {...problem, problemSetId: problemId, orderId: i}
        console.log(problemToInsert)

        let ourProblem = await ourCrud.make(problemToInsert, 'problemSet')
                                        .catch((err) => { res.status(500).json({}) })
        console.log(ourProblem)
    })

    res.status(200).json()


})

// this is for cleaning out the database (dev only)
router.delete('/', async (req, res) => {
    let tables = ['problemSet', 'problemSets']
    // let deleteData = await ourCrud.clearTable('problemSet')
    // let deleteData2 = await ourCrud.clearTable('problemSets')

    let idFromProblemSet = await ourCrud.getAll('problemSet')
    console.log(idFromProblemSet)
    idFromProblemSet.forEach(async (id) => {
        let deleteData = await ourCrud.removeById(id, 'problemSet')

    })

    let idFromProblemSets = await ourCrud.getAll('problemSets')
    console.log(idFromProblemSets)
    idFromProblemSets.forEach(async (id) => {
        let deleteData2 = await ourCrud.removeById(id, 'problemSets')
        
    })
    // tables.forEach( async (table) => {
    //     let deleteData = await ourCrud.clearTable(table)
    // })
    // await ourCrud.clearAllTables(['problemSets', 'problemSet'])
    res.status(200).json()
})
// router.put('/:problemSetId')

// router.delete('/:problemSetId')


module.exports = router

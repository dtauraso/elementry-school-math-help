
// put CRUD routes for the user here
const router = require('express').Router();
const ourCrud = require('../../common-db-operations/crud')
function compareFunction(item_i, item_j){
    return item_i.orderId - item_j.orderId 
}
// console.log('here')
router.get('/', async (req, res, next) => {
    console.log('in our get')
    let problemSets = await ourCrud.getAll('problemSets').catch((err) => { res.status(500).json({}) });

    console.log(problemSets)
    if(problemSets.length === 0) {
        res.status(500).json({})
        // next()
    } else {
        let myProblems = problemSets.map(async (problemSetSummary) => {
            // console.log(problemSetSummary.id)
            let problems = await ourCrud.getAllByFilter({problemSetId: problemSetSummary.id}, 'problemSet')
                                        .catch((err) => { res.status(500).json({}) })
            // console.log('problems from tables', problems)
            problems = problems.sort(compareFunction)
            // console.log('problems from tables sorted', problems)

            return problems
    
        })


        let problems = await Promise.all(myProblems).then(problems => problems)
        // console.log('problems retreived', problems)
        // console.log('problem sets', problemSets)
        
        res.status(200).json({
            problemSets: problemSets,
            problems: problems
        })
    
    }

    

})

// router.get('/:problemSetId')

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

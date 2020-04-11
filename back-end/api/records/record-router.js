
// put CRUD routes for the user here
const router = require('express').Router();
const ourCrud = require('../../common-db-operations/crud')
router.get('/', async (req, res, next) => {
    console.log('in our get')
    let problemSets = await ourCrud.getAll('problemSets').catch((err) => { res.status(500).json({}) });

    // console.log(problemSets)
    if(problemSets.length == 0) {
        res.status(500).json({})
        // next()
    } else {
        console.log(problemSets[0].id)
        let problems = await ourCrud.getAllByFilter({problemSetId: problemSets[0].id}, 'problemSet')
                                    .catch((err) => { res.status(500).json({}) })
        console.log(problems)
        res.status(200).json(problemSets)
    
    }

    

})

// router.get('/:problemSetId')

router.post('/', async (req, res) => {
    // console.log(req.body)
    let problemSet = req.body['problem sets table']

    let ourInsertedProblemSetRow = await ourCrud.make(problemSet, 'problemSets')
                                            .catch((err) => { res.status(500).json({}) })
    console.log(ourInsertedProblemSetRow)
    let problemId = ourInsertedProblemSetRow.id

    req.body['problem set table'].forEach( async (problem) => {

        let problemToInsert = {...problem, problemSetId: problemId}
        console.log(problemToInsert)

        let ourProblem = await ourCrud.make(problemToInsert, 'problemSet')
                                        .catch((err) => { res.status(500).json({}) })
        console.log(ourProblem)
    })

    res.status(200).json()


})

// router.put('/:problemSetId')

// router.delete('/:problemSetId')


module.exports = router

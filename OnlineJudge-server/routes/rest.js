const express = require('express');
const router = express.Router();

const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();
EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

// Get all problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

// Get one problem given an id
router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

// post problem
router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(problem => res.json(problem),
            error => res.status(400).send('Problem name already exists'));
});

// update problem
router.put('/problems', jsonParser, (req, res) => {
    problemService.modifyProblem(req.body)
        .then(problem => res.json(problem),
            error => res.status(400).send('Failed to update document'));
});

// build and run
router.post('/build_and_run', jsonParser, (req, res) => {
    const userCode = req.body.user_code;
    const lang = req.body.lang;
    console.log('lang:', lang, 'code:', userCode);

    restClient.methods.build_and_run(
        {data: {code: userCode, lang: lang},
        headers: {'Content-Type': 'application/json'}},
        (data, response) => {
            const text = `Build output: ${data['build']}, execute output: ${data['run']}`;
            console.log(text);
            res.json(text);
        }
    )
});

module.exports = router;

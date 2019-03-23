const express = require("express");
const router = express.Router();

router
    .get('/', (req, res) => {
        res.render('index');index.ejs作成後実装
    })
    .get('/quiz', (req, res) => {
        res.render('about'); about.ejs作成後実装
    });

module.exports = router;
    
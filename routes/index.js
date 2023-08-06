const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');

router.get('/', (req, res) => {
    console.log('main page on');
    let site_list = template.list(req.list);
    res.send(template.html(undefined, undefined, site_list,`
        <a href = "./page/create">
            <button class = "button_style">create</button>
        </a>
    `));
});

module.exports = router;
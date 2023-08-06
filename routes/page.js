const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');
const fs = require('fs');
const path = require('path');

router.use(express.static('public'));

router.get('/create', (req, res) => {
    let image_src = './images/img1.png';
    let create_box = `
        <form action = "/page/create_process" method = "post" class = "create_container">
            <input type = "text" name = "title" placeholder = "title" class = "text_style"><br>
            <input type = "text" name = "link" placeholder = "site link" class = "text_style"><br>
            <input type = "text" name = "imgSrc" placeholder = "img source" class = "text_style"><br>
            <input type = "submit" value = "submit" class = "button_style">
        </form> 
    `;
    let html = template.html('/',image_src, create_box, `
    <a href = "/">
        <button class = "button_style">home</button>
    </a>
    `);
    res.send(html);
});

router.post('/create_process', (req, res) => {
    let info = req.body; //title, link, imgSrc

    let obj = {
        title: info.title,
        link: info.link,
        src: info.imgSrc
    };

    let data = JSON.stringify(obj, null, 2);

    if (info.title.split('').indexOf('?') > -1){
        res.redirect('/');
    }else{
        // fs.writeFile(`data/${title}`, link, 'w', err => {
        //     if (err) console.dir(err);
        //     res.redirect(`/page/${title}`);
        // });
        fs.writeFile(`data/${info.title}.json`, data, (err) => {
            if (err) throw err;
            console.log('data written to file.');
            res.redirect(`/page/${info.title}`);
        });

        //fs.writeFileSync(`data/${title}.json`, data);
    }
});

router.get('/update/:pageId', (req, res) => {
    let filteredId = path.parse(req.params.pageId).base;
    console.log(filteredId);
    fs.readFile(`data/${filteredId}.json`, (err, data) => {
        let tester = JSON.parse(data);
        if (err) throw err;

        let update_form = `
            <form action = "/page/update_process" method = "post" class = "create_container">
                <input type = "hidden" name = "id" value = "${filteredId}">
                <input type = "text" name = "title" class = "text_style" value ="${filteredId}"><br>
                <input type = "text" name = "link"  class = "text_style" value = "${tester.link}"><br>
                <input type = "text" name = "imgSrc" class = "text_style" value = "${tester.src}"><br>
                <input type = "submit" value = "submit" class = "button_style">
            </form> 
        `;

        let html = template.html(tester.link, tester.src, update_form, `
        <a href = "/">
            <button class = "button_style">home</button>
        </a>
        `);
        res.send(html);
    });
});

router.post('/update_process', (req, res) => {
    let info = req.body;

    let obj = {
        title: info.title,
        link: info.link,
        src: info.imgSrc
    };

    let data = JSON.stringify(obj, null, 2);

    if (info.title.split('').indexOf('?') > -1){
        res.redirect('/');
    }else{
        fs.rename(`data/${info.id}.json`, `data/${info.title}.json`, err => {
            fs.writeFile(`data/${info.title}.json`, data, (err) => {
                res.redirect(`/page/${info.title}`);
            });
        });
    }
});

router.post('/delete_process', (req, res) => {
    let info = req.body;
    let id = info.id;
    let filteredId = path.parse(id).base;
    console.log(filteredId);
    fs.unlink(`data/${filteredId}.json`, (err) => {
        res.redirect('/');
    });
});

router.post('/delete_cancle', (req, res) => {
    res.redirect('/');
});

router.get('/:pageId', (req, res) => {
    let filteredId = path.parse(req.params.pageId).base;
    console.log(`${filteredId} page on.`);
    let site_list = template.list(req.list, filteredId);
    fs.readFile(`data/${filteredId}.json`, (err, data) => {
        if (err) throw err;
        let tester = JSON.parse(data);
        let html = template.html(tester.link, tester.src, site_list, `
        <a href = "/">
            <button class = "button_style">home</button>
        </a>
        <a href = "/page/update/${filteredId}">
            <button class = "button_style">update</button>
        </a>
        <form onsubmit = "real_delete()" action = "/page/delete_cancle" method = "post" style = "display: inline" id = "delete_form">
            <input type = "hidden" name = "id" value = "${filteredId}">
            <input type = "submit" class = "button_style" value = "delete">
        </form>
        `);
        res.send(html);
    });
});

module.exports = router;
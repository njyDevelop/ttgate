const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const indexRouter = require('./routes/index.js');
const pageRouter = require('./routes/page.js');
const compression = require('compression');
const bodyParser = require('body-parser');

app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (req, res, next) => {
    fs.readdir('./data', (error, fileList) => {
        let new_fileList = [];
        fileList.forEach((v, _) => {
            let word = v.split('.json');
            new_fileList.push(word[0]);
        });
        req.list = new_fileList;
        next();
    });
});

app.use('/', indexRouter);

app.use('/page', pageRouter);

app.use((req, res, next) => {
    res.status(404).send('<h1>404 not found...</h1>');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('status 500. error!');
});

app.listen(port, () => {
    console.log('through the gate Start!');
});

/* 남은 할 것

delete 기능 구현 -> 완, 정말 삭제? 물어보기 추가하기 -> 완
디자인 추가 조절
스크롤 기능 추가
*/
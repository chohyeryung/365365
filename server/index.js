const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 1000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello word'))

app.post('/student', (req, res) => {
    let student = req.body;
})

app.listen(port, () => console.log(`app listening on port ${port}`))
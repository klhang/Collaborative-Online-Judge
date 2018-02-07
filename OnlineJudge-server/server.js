const express = require('express');
const app = express();
const restRouter = require('./routes/rest');

app.use('/api/v1', restRouter);

app.get('/', (req,res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Port 3000 working'))

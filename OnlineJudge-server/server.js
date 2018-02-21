const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');

mongoose.connect('mongodb://klhang:85201918a@ds229468.mlab.com:29468/test-db')

// mongodb://user:user@ds117858.mlab.com:17858/problems
// mongodb://<dbuser>:<dbpassword>@ds229468.mlab.com:29468/test-db

app.use('/api/v1', restRouter);

app.get('/', (req,res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Port 3000 working'))

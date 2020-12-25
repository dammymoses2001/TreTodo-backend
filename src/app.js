//libraries used
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

//
const User = require('./routes/user');
const TodoBody = require('./routes/todobody');
//const initalData = require('./routes/initialData');
//const TodoData = require('./routes/todo')
const TodoLabel = require('./routes/todomain')
const getTodoRoutes = require('./routes/getTodo')
const othersTodoRoutes = require('./routes/othersTodo');
const permissionRoutes = require('./routes/permissions')

//using MongooseDB
mongoose.connect('mongodb://localhost/tretodos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log('DB connected!'))
    .catch((err) => console.error(err));


//using the libraries
const app = express();
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', User);
app.use('/api', TodoBody);
app.use('/api', TodoLabel);
app.use('/api', getTodoRoutes);
app.use('/api', othersTodoRoutes);
app.use('/api', permissionRoutes);
//app.use('/', initalData);
//app.use('/api', TodoData);
// app.use(express.)

//index endpoint
app.get('/', (req, res) => {
    res.status(200).json('/Welcome to Tretodos/')
})

//porter
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening from ${PORT}`)
})
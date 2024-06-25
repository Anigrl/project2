require('dotenv').config();
 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

 
const indexRouter = require('./routes/index');
const deleteRouter = require('./routes/del');
const editRouter = require('./routes/edit');
const app = express();
const port = process.env.PORT;
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/edit',editRouter)
app.use('/delete',deleteRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port,()=>{
  console.log(`server is running at port ${port} `)
})

module.exports = app;

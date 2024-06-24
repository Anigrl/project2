var express = require('express');
var router = express.Router();
const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project'
})
con.connect((err) => {
  if (err) {
    throw err
  }
  console.log("connected")
})


/* GET home page. */
router.get('/', function (req, res, next) {
  con.query(`select * from tablename`, (err, result) => {
    if (!err) {
      res.render('index', { data: result, msg: 'recieved' })
      console.log(result)
    }
    else {
      console.log(err)
      res.render('index', { msg: "problem occured", data: '' })
    }
  })


  // res.render('index', { title: 'Express' });
});
router.get("/getdata", function (req, res) {
   

  let {num, page, val } = req.query;
  const pageSize = 20;
  let offset = 0;

  if (page) {
    page = parseInt(page);
    if (isNaN(page) || page < 1) page = 1;
    offset = (page - 1) * pageSize;
  } else {
    page = 1;
  }

  if (val) {
    console.log(val)
    con.query(`select * from tablename where Topic like '${val}%'`, (err, result) => {
      if (!err) {
        console.log(result)
        res.json(result)
      } else {
        console.log("error in search : ", err)
        res.status(500).send(err)
      }
    })
  }
  else if (num) {

    con.query(`select * from tablename limit ${num}`, function (err, result) {
      if (!err)
        // res.render('index',{data:result,msg:'recieved'})
        res.json(result)

      else
        res.send(err)
    })
  }
  else {
    con.query(`SELECT * FROM tablename LIMIT ? OFFSET ?`, [pageSize, offset], (err, result) => {
      if (err) {
        res.status(500).send("Error in page: " + err);
      } else {
        res.json({ data: result, page });
      }
    });
  }
})


module.exports = router;

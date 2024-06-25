const express = require('express');
const router = express.Router();
 
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

con.connect((err)=>{
    if(err) throw err
    console.log("connected")
})

router.get('/',(req,res)=>{
    con.query(`select * from tablename`,(err,result)=>{
        if(!err){
            res.render('index',{data:result})
        }else{
            console.log(err)
        }
    })

})


router.get('/getdata', (req, res) => {
  let { page, val } = req.query;
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
    con.query(`SELECT * FROM tablename WHERE Topic LIKE ? LIMIT ? OFFSET ?`, [`${val}%`, pageSize, offset], (err, result) => {
      if (err) {
        console.log("Error in search:", err);
        res.status(500).send(err);
      } else {
        res.json({ data: result, page });
      }
    });
  } else {
    con.query(`SELECT * FROM tablename LIMIT ? OFFSET ?`, [pageSize, offset], (err, result) => {
      if (err) {
        res.status(500).send("Error in page: " + err);
      } else {
        res.json({ data: result, page });
      }
    });
  }
});

module.exports = router;

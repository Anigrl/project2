var express = require('express');
var router = express.Router();
const mysql = require('mysql')

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'project'
})
con.connect((err)=>{
  if(err){
    throw err
  }
  console.log("connected")
})


/* GET home page. */
router.get('/', function(req, res, next) {
  con.query(`select * from tablename`,(err,result)=>{
    if(!err){
      res.render('delete',{data:result})
      console.log(result)
    }
    else{
        res.render('delete',{data:''})
        console.log("error occured")
       
    }
  })


  // res.render('index', { title: 'Express' });
});
 

module.exports = router;

var express = require('express');
var router = express.Router();
const mysql = require('mysql')
 
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

con.connect((err)=>{
  if(err){
    throw err
  }
  console.log("connected")
})


/* GET home page. */
router.get('/', function(req, res, next) {
  let {sr }= req.query
  console.log(sr)
  console.log(req.query)
  con.query(`select * from tablename where SrNo =?`,[sr],(err,result)=>{
    if(!err){
      res.render('edit',{data:result})
      console.log(result , "result is")
    }
    else{
        res.render('edit',{data:''})
        console.log("error occured in editing ",err)
       
    }
  })

  // res.render('index', { title: 'Express' });
});

 

router.post('/', (req, res) => {
  console.log(req.query , req.body)
  const {sr} = req.query
  console.log(typeof(sr))
  const {Topic , Content , Decscription}  = req.body
  con.query(`UPDATE tablename SET Topic =?, Content =?, Decscription=? WHERE SrNo=?`,[Topic,Content,Decscription ,sr], (err, result) => {
      if (!err) {
          console.log(result)
          res.redirect('/');
      } else {
          res.status(500).send("Could not update record: " + err);
      }
  });
});
 

module.exports = router;

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
      res.render('index',{data:result,msg:'recieved'})
      console.log(result)
    }
    else{
      console.log(err)
      res.render('index',{msg:"problem occured",data:''})
    }
  })


  // res.render('index', { title: 'Express' });
});
router.get("/getdata",function(req,res){
  var n=req.query.num
  con.query(`select * from tablename limit ${n}`,function(err,result){
    if(!err)
      // res.render('index',{data:result,msg:'recieved'})
    res.json(result)
     
    else
    res.send(err)
  })
})


router.post('/',(req,res)=>{
   if(req.body){

     const {page,search} = req.body
     
     con.query(`select * from tablename `,(err,result)=>{
       if(!err){
         let sliced = result.slice(0,page)
         console.log(sliced)
         console.log(search)
         res.render('index',{data:sliced})
        }else{
          res.render('index',{data:result})
          console.log("query failed")
          
        }
      })
      console.log(req.body)
    }else{
      console.log('nothing selected')
    }

})

module.exports = router;

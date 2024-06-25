const express = require('express');
const router = express.Router();

const mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'project'
})

con.connect((err)=>{
    if(err) throw err
    console.log("connected")
})

router.get('/',function(req,res,next){
    let {sr} = req.query;
    console.log(req.query);
    confirm("do you want to delete the data")
    
        con.query(`delete from tablename where SrNo =?`,[sr],(err,result)=>{
            if(!err){
                console.log(result)
                res.redirect('/')
            }
            else{
                res.status(400).send("could not delete data , error occured " ,err)
            }
        })
    
     
})

module.exports = router;
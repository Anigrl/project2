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

router.get('/',function(req,res,next){
    let {sr} = req.query;
    console.log(req.query);
    
    
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
var express = require('express');
var router = express.Router();
var db = require('../modules/database');

router.get('/', (req,res,next) => {
    db.query("SELECT * FROM state", function (err, result, fields) {
      if (err) {
        return res.send(err);
      }
      else{
        return res.json({
          data:result
        })
      }
    });
})

router.post('/addstate', (req,res,next) => {
    console.log(req.body);
    // const {continent_name} = req.query
    db.query('select state_id from state where state_name = "'+req.body.state_name+'"', function(err,data){
      console.log(data);
      if(data.length !== 0){ 
        console.log("Already Exists" , data);
        res.json({Success:false, message:"State Already Exists"})
      } else {
        console.log("Not Exixts");
        db.query('INSERT INTO state (country_id,state_name) VALUES("'+req.body.country_id+'","'+req.body.state_name+'")', function(err,data){  
              if(err){
                  res.json({success: false});
                }else{
                  res.json({success: true});
                }
              });
          }
    })
    // const INSERT_CUSTOMER_QUERY = `INSERT INTO 'continent' (continent_name) values('${continent_name}')`;
    // res.send("add names...");
    // db.query(INSERT_CUSTOMER_QUERY,(err,result) => {
    //   if(err){
    //      return res.send(err);
    //   } else {
    //     res.send('added successfully....')
    //   }
    // })
})

module.exports = router;
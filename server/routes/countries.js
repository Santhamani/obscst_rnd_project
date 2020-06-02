var express = require('express');
var router = express.Router();
var db = require('../modules/database')

router.get('/', (req,res,next) => {
    db.query("SELECT * FROM country", function (err, result, fields) {
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

router.post('/addcountry', (req,res,next) => {
    console.log(req.body);
    // var min = 0 , max = 0,ConRank, Area;
    // db.query('select c2.continent_area_rank as ConRank from continent c2 where unique_continent_id = "'+req.body.unique_continent_id+'"', (err, data) => {
    // if(err){
    //   console.log("error",err)
    // } 
    // else {
    //   console.log("254 ConRank", data, data[0].ConRank)
    //   ConRank = data[0].ConRank;
    //   console.log("256",ConRank);
    // }
    // })
    db.query('select unique_country_id,country_area from country where country_name = "'+req.body.country_name+'"', function(err,data){
      console.log(data);
      if(data.length !== 0){ 
        // console.log("Already Exists" , data);
        res.json({Success:false, message:"Country Already Exists"})
      } else {
          db.query('select * from country', function(err,data){
            if (data.length !== 0){
              // console.log("area", data);
                  db.query('select MAX(cc.country_area_rank) AS cmax, MIN(cc.country_area_rank) AS cmin from country cc where cc.country_area <= "'+req.body.country_area+'"  ', function(err, data) {
                    if(err)
                    throw err
                    else
                    console.log(" 265 min max values",data, data[0].cmin, data[0].cmax);
                    //New entry with highest rank and small area
                    if(data[0].cmin == null && data[0].cmax == null){
                      db.query('select c1.country_area_rank As rank from country c1 ORDER By c1.country_area_rank DESC LIMIT 1;' ,(err, rankdata) => {
                        if(err){
                        console.log("error", err);
                        } else{
                          console.log("272 area rank value",rankdata[0].rank+1, rankdata[0].rank, rankdata);
                          db.query('select c2.continent_area_rank as ConRank from continent c2 where unique_continent_id = "'+req.body.unique_continent_id+'"',(err,data) => {
                            if (err){
                              console.log("error",err);
                            } else {
                              console.log("con rank", data, data[0].ConRank);
                              console.log("278 area rank value",rankdata[0].rank+1, rankdata[0].rank, rankdata);
                              db.query('INSERT INTO country (country_name, country_area_rank, country_area, unique_continent_id, country_rank_id) VALUES ("'+req.body.country_name+'","'+ (rankdata[0].rank + 1) +'", "'+req.body.country_area+'","'+req.body.unique_continent_id+'","'+data[0].ConRank+(rankdata[0].rank + 1)+'")', (err, data) => {
                                if(err)
                                throw err
                                else
                                console.log({Success:true, message:"Least value inserted"})
                              })
                            }
                          })
                        }
                      })
                      console.log("min val")
                    } else {
                      //Between(top-bottom-> >= area(area between big area(lowest rank) & small area(highest rank)) <=) and Lowest(big area) rank 
                      db.query('select c2.continent_area_rank as ConRank from continent c2 where unique_continent_id = "'+req.body.unique_continent_id+'"', (err, rdata) => {
                        if(err){
                          console.log("error",err)
                        } 
                        else {
                          db.query('UPDATE country set country_area_rank = country_area_rank + 1 where country_area_rank >= "'+ data[0].cmin +'"', function(err, data){
                          if(err)
                          console.log(err,"error")
                          else 
                          console.log({Success:true, message:"Countries Updated succesfully"});
                          });
                          console.log("ConRank", rdata, rdata[0].ConRank, data[0].cmin)
                          db.query('INSERT INTO country (country_name, country_area_rank, country_area, unique_continent_id, country_rank_id) VALUES ("'+req.body.country_name+'","'+ data[0].cmin +'", "'+req.body.country_area+'","'+req.body.unique_continent_id+'","'+rdata[0].ConRank+(data[0].cmin)+'")', function(err, data){
                          if(err)
                          console.log(err,"error")
                          else 
                          console.log({Success:true, message:"New Country Inserted succesfully"});
                          });
                          db.query('UPDATE country set country_rank_id = "'+rdata[0].ConRank+country_rank_area+'" where country_area_rank > "'+ data[0].cmin +'"', (err,data) => {
                            if(err){
                              console.log("Err", err)
                            } else {
                              console.log("Area Rank id updated successfully");
                            }
                          })
                        }
                      })
                      console.log("max-min vals" , data,data[0].cmin, data[0].cmax)
                    }
                  })
            }
            // If db is null no data
            else {
              console.log("intial entry", req.body);
              db.query('select c2.continent_area_rank as ConRank from continent c2 where unique_continent_id = "'+req.body.unique_continent_id+'"', (err,data) => {
                if(err){
                  console.log("Err", err)
                } else {
                  db.query('INSERT INTO country (country_name, country_area_rank, country_area, unique_continent_id, country_rank_id) VALUES ("'+req.body.country_name+'","'+ 1 +'", "'+req.body.country_area+'","'+req.body.unique_continent_id+'","'+data[0].ConRank+1+'")', function(err,data){  
                    if(err){
                        res.json({success: false});
                        console.log("error", err)
                      }else{
                        res.json({success: true});
                        console.log("intial entry inserted")
                      }
                  });
                }
              })
              
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
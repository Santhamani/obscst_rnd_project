
var express = require('express');
var router = express.Router();
var db = require('../modules/database');

/* GET home page. */
// router.get('/', function(req, res, next) {
// //   res.render('Continents', { title: 'Express' });
// res.send("Continents.....");
// });

router.get('/', (req,res,next) => {
    db.query("SELECT * FROM continent", function (err, result, fields) {
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

router.get('/continent/:id', (req,res,next) => {
  // res.send(req.params['id']);
  db.query('SELECT * FROM continent where continent_name= "'+req.params.id+'"', function (err, result, fields) {
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

router.post('/continent/:id', (req,res,next) => {
  // res.send(req.params['id']);
  db.query('DELETE FROM continent where continent_name= "'+req.params.id+'"', function (err, result, fields) {
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

// Insert continents if it is not exists
router.post('/addcontinent', (req,res,next) => {
    // console.log(req.body);
    db.query('select unique_continent_id,continent_area from continent where continent_name = "'+req.body.continent_name+'"', function(err,data){
      // console.log("190",data);
      if(data.length !== 0){ 
        // console.log("Already Exists" , data);
        res.json({Success:false, message:"Continent Already Exists"})
      } else {
          // db.query('select unique_continent_id,continent_area, continent_area_rank from continent where  continent_area < "'+req.body.continent_area+'"', function(err,data){
          // console.log(req.body.continent_area, "Not Exixts", data);
          // })
          db.query('select * from continent', function(err,data){
            if (data.length !== 0){
              // console.log("area", data);
                  db.query('select MAX(c.continent_area_rank) AS max, MIN(c.continent_area_rank) AS min from continent c where c.continent_area <= "'+req.body.continent_area+'"', function(err, data) {
                    if(err)
                    throw err
                    else
                    console.log("235 min max values",data, data[0].min, data[0].max);
                    //New entry with highest rank and small area
                    if(data[0].min == null && data[0].max == null){
                      console.log("238")
                      db.query('select c1.continent_area_rank As rank from continent c1 ORDER By c1.continent_area_rank DESC LIMIT 1;' ,(err, rankdata) => {
                        if(err){
                        console.log("error", err);
                        } else{
                          console.log("area rank value",rankdata[0].rank+1, rankdata[0].rank, rankdata);
                          db.query('INSERT INTO continent (continent_name, continent_area_rank, continent_area) VALUES ("'+req.body.continent_name+'","'+ (rankdata[0].rank + 1) +'", "'+req.body.continent_area+'")', (err, data) => {
                            if(err)
                            throw err
                            else
                            console.log({Success:true, message:"Least value inserted"})
                          })
                        }
                      })
                      console.log("min val")
                    } else {
                      //Between(top-bottom-> >= area(area between big area(lowest rank) & small area(highest rank)) <=) and Lowest(big area) rank 
                      db.query('UPDATE continent set continent_area_rank = continent_area_rank + 1 where continent_area_rank >= "'+ data[0].min +'"', function(err, data){
                        if(err)
                        console.log(err,"error")
                        else 
                        console.log({Success:true, message:"Continents Updated succesfully"});
                      });
                      db.query('INSERT INTO continent (continent_name, continent_area_rank, continent_area) VALUES ("'+req.body.continent_name+'","'+ (data[0].min) +'", "'+req.body.continent_area+'")', function(err, data){
                        if(err)
                        console.log(err,"error")
                        else 
                        console.log({Success:true, message:"New Continent Inserted succesfully"});
                      });
                      console.log("max-min vals" , data,data[0].min, data[0].max)
                    }
                  })
            }
            // If db is null no data
            else {
              db.query('INSERT INTO continent (continent_name, continent_area, continent_area_rank) VALUES("'+req.body.continent_name+'","'+req.body.continent_area+'", "'+ 1 +'")', function(err,data){  
                if(err){
                    res.json({success: false});
                  }else{
                    res.json({success: true});
                  }
              });
            }
          });    
      }
    })
})

module.exports = router;
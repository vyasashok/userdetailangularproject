const {db} = require('../commom/connection');
const UUID = require('uuid');

const saveCity = (req, res) =>{
      let cityId = UUID();
      let cityName = req.body.cityName;


      db.run("INSERT INTO city_master VALUES (?,?)",[cityId,cityName], function(err, rows){
        if(err){
            res.json({response:null,success:false, msg:"some error!",err:err});
        }
        else{
            res.json({response:rows, success:true, msg:"city saved successfuly!", err:null});
        }
       
    });  
}

module.exports = {
    saveCity
}
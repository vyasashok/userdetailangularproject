const {db} = require('../commom/connection');

const getMasterData = (req, res) => {

    let data = {}
   
    db.all("SELECT * FROM city_master", function(err1, rows1){
        if(err1){
            return  res.json({response: null,  msg: "some error!", err:err1})
        }
      
        else{
            data.cities = rows1;

            db.all("SELECT * FROM skill_master", function(err2, rows2){
                if(err2){
                    return  res.json({response: null,  msg: "some error!", err:err2})
                }
                else{
                    data.skills = rows2;
                    return  res.json({response: data,  msg: "success!", err:null})
                }
            })
        }            
    }) 
}

module.exports = {
    getMasterData
}
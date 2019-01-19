const {db} = require('../commom/connection');

const getUesrs = (req, res) => {
 
    db.all("SELECT * FROM user_info", function(err, rows){
        if(err){
             res.json({response: null,  msg: "some error!", err:err})
        }
      
        else{
          res.json({response: rows,  msg: "success", err:null})

        }            
    }) 
}

module.exports = {
    getUesrs
}
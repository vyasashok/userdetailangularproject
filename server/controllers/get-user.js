const {db} = require('../commom/connection');

const getUesr = (req, res) => {

    let email = req.body.email;
 
    db.all("SELECT * FROM user_info WHERE email = ?",[email], function(err, row){
        if(err){
             res.json({response: null,  msg: "some error!", err:err})
        }
      
        else{
          res.json({response: row,  msg: "success", err:null})

        }            
    }) 
}

module.exports = {
    getUesr
}
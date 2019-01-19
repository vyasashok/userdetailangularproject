const {db} = require('../commom/connection');

const deleteUser = (req, res) => {

    let id = req.body.userId;
 
    db.all("DELETE FROM user_info WHERE user_id = ?",[id], function(err, row){
        if(err){
             res.json({response: null,  msg: "some error!", err:err})
        }
      
        else{
          res.json({response: row,  msg: "success", err:null})

        }            
    }) 
}

module.exports = {
    deleteUser
}
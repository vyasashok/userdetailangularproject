const {db} = require('../commom/connection');
const UUID = require('uuid');

const saveSkill = (req, res) =>{
      let skillId = UUID();
      let skillName = req.body.skillName;


      db.run("INSERT INTO skill_master VALUES (?,?)",[skillId,skillName], function(err, rows){
        if(err){
            res.json({response:null,success:false, msg:"some error!",err:err});
        }
        else{
            res.json({response:rows, success:true, msg:"skill saved successfuly!", err:null});
        }
       
    });  
}

module.exports = {
    saveSkill
}
const {db} = require('../commom/connection');
const UUID = require('uuid');

const saveUser = (req, res) =>{
      let userId = UUID();
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let email = req.body.email;
      let gender = req.body.gender;
      let city = req.body.city;
      let imageName = req.body.imagePath;
      let skills = "";

      for(let i = 0; i < req.body.skills.length; i++){
          if(i !== req.body.skills.length - 1){
            skills += req.body.skills[i] + ",";
          }
          else{
            skills += req.body.skills[i];
          }         
      }

      db.all("SELECT * FROM user_info WHERE email = ?",[email], function(err1, rows1){
        if(err1){
            return res.json({response: null, msg: "some error occured!", err:err1})
        }
        
        else if(rows1.length === 0){

            db.run("INSERT INTO user_info VALUES (?,?,?,?,?,?,?,?)",[userId,firstName,lastName,email,gender,city,skills,imageName], function(err, rows){
                if(err){
                   return res.json({response:null,success:false, msg:"some error!",err:err});
                }
                else{
                   return res.json({response:rows, success:true, msg:"User saved successfuly!", err:null});
                }
               
            }); 
        } 

        else{
            return res.json({response:null,success:false, msg:"Email already exist!",err:"Email already exist!"});
        }
     }) 
 
}

module.exports = {
    saveUser
}
const {db} = require('../commom/connection');

const editUesr = (req, res) => {

    let email = req.body.email;

    let firstName = req.body.details.firstName;
    let lastName = req.body.details.lastName;
    let newEmail = req.body.details.email;
    let gender = req.body.details.gender;
    let city = req.body.details.city;
    let imageName = req.body.details.imagePath;
    let skills = "";

    for(let i = 0; i < req.body.details.skills.length; i++){
        if(i !== req.body.details.skills.length - 1){
          skills += req.body.details.skills[i] + ",";
        }
        else{
          skills += req.body.details.skills[i];
        }         
    }



    // db.all("SELECT * FROM user_info WHERE email = ?",[newEmail], function(err1, rows1){
    //     if(err1){
    //         return res.json({response: null, msg: "some error occured!", err:err1})
    //     }
        
    //     else if(rows1.length === 0){
               
    //     } 

    //     else{
    //         return res.json({response:null,success:false, msg:"Email already exist!",err:"Email already exist!"});
    //     }
    //  })
    
 
    db.all("SELECT * FROM user_info WHERE email = ?",[email], function(err, rows){
        if(err){
             return res.json({response: null,  msg: "some error!", err:err})
        }
                   
        else if(rows.length === 0){
            return  res.json({response: null, msg: "no such user registered!", err:"no such user registered!"})
        }
        else{
            if(email === newEmail){
                db.run('UPDATE user_info SET firstname = ?, lastname = ?, email = ?, gender = ?, city = ?, skills = ?, imageName = ? WHERE email = ?', [firstName, lastName, newEmail, gender, city, skills, imageName, email]);
                return res.json({response: rows, msg: "user updated successfuly!", err:null})
            }
            else{
                            
                db.all("SELECT * FROM user_info WHERE email = ?",[newEmail], function(err1, rows1){
                    if(err1){
                        return res.json({response: null, msg: "some error occured!", err:err1})
                    }
                    
                    else if(rows1.length === 0){
                        db.run('UPDATE user_info SET firstname = ?, lastname = ?, email = ?, gender = ?, city = ?, skills = ?, imageName = ? WHERE email = ?', [firstName, lastName, newEmail, gender, city, skills, imageName, email]);
                        return res.json({response: rows, msg: "user updated successfuly!", err:null})
                    } 

                    else{
                        return res.json({response:null,success:false, msg:"Email already exist!",err:"Email already exist!"});
                    }
                 })
            }  
        }            
    }) 
}

module.exports = {
    editUesr
}
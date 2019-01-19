const uploadFolder = 'F://angular/userdetailproject/src/assets/images';
const fs = require('fs-extra');

const uploadImage = async (req, res) => {
   
    let imageFile = req.files.image.data;
    let imageName = req.body.imageName;

 
    let fileExtn = imageName.split(".")[1].toUpperCase();
    let validFileExtn =  ['PNG', 'GIF', 'JPEG', 'JPG'];
    let isValidFileExtn = validFileExtn.filter((extn) => extn === fileExtn);
    if (isValidFileExtn.length > 0) {
        let dirName = uploadFolder + "/" + imageName;
        try {
            await fs.outputFile(dirName, imageFile);
        } catch (err) {
            return res.json({response:null, success:false, msg:"Error in image upoad!", err:"Error in image upoad!"});
        }

    }
    else {
       
       return res.json({response:null, success:false, msg:"File extension not supported!", err:"File extension not supported."});
    }

    return res.json({response:"success", success:true, msg:"Image uploaded successfuly!", err:null});
    
}

module.exports = {
    uploadImage
}
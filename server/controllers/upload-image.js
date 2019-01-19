const uploadFolder = 'F://angular/userdetailproject/uploads';
const fs = require('fs-extra');

const uploadImage = async (req, res) => {
   
    let imageFile = req.files.image.data;
    let imageName = req.files.imageName;
    
}

module.exports = {
    uploadImage
}
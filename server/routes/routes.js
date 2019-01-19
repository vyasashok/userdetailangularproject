const router = require('express').Router();
const saveUserController = require('../controllers/save-user');
const uploadImageController = require('../controllers/upload-image');
const saveCityController = require('../controllers/save-city');
const saveSkillController = require('../controllers/save-skill');
const getMasterDataController = require('../controllers/get-master-data');
const getUsersController = require('../controllers/get-users');
const getUserController = require('../controllers/get-user');
const editUserController = require('../controllers/edit-user');
const deleteUserController = require('../controllers/delete-user');

router.post('/saveuser', saveUserController.saveUser);
router.post('/upload', uploadImageController.uploadImage);
router.post('/savecity', saveCityController.saveCity);
router.post('/saveskill', saveSkillController.saveSkill);
router.get('/getmasterdata', getMasterDataController.getMasterData);
router.get('/getusers', getUsersController.getUesrs);
router.post('/getuser', getUserController.getUesr);
router.post('/edituser', editUserController.editUesr);
router.post('/deleteuser', deleteUserController.deleteUser);

module.exports = router;


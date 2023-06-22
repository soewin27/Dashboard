const userController=require("../../controller/v1/userController")
const router=require("express").Router();

router
    .route("/")
    .get(userController.displayUser)
router
    .route("/filter")
    .get(userController.filterUser)
router  
    .route("/search/:key")
    .get(userController.searchUser)

module.exports=router;
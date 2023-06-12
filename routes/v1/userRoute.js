const userController=require("../../controller/v1/userController")
const router=require("express").Router();

router
    .route("/")
    .get(userController.allUsers)

module.exports=router;
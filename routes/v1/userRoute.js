const userController=require("../../controller/v1/userController")
const router=require("express").Router();

router
    .route("/")
    .get(userController.displayUser)

module.exports=router;
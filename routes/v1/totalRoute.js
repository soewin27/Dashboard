const totalController=require("../../controller/v1/totalController")
const router=require("express").Router();

router
    .route("/")
    .get(totalController.allUsers)

module.exports=router;
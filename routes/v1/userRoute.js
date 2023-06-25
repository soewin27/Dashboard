const userController=require("../../controller/v1/userController")
const router=require("express").Router();
const auth= require("../../helpers/auth")
router
    .route("/")
    .get(userController.displayUser)
    .post(auth.register)

router 
    .route("/login")
    .post(auth.login)

router
    .route("/profile")
    .get(auth.show)
    
router
    .route("/filter")
    .get(userController.filterUser)

// router  
//     .route("/filter/:key")
//     .get(userController.searchUser)

module.exports=router;
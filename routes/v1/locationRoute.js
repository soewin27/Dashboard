const locationController=require("../../controller/v1/locationController")
const router=require("express").Router();

router
    .route("/")
    .get(locationController.alllocation)
    .post(locationController.createLocation)
    .get(locationController.filterlocation)

router  
    .route("/:id")
    .get(locationController.selectedlocation)
    .put(locationController.updateLocation)
    .delete(locationController.deleteLocation)

module.exports=router;
const db=require("../../database/models/index")
const Location=db.Location

const alllocation=async (req,res) =>{
    try {
        const locations=await Location.findAll()
        res.json({
            status:true,
            data:locations
        })
    } catch (error) {
        console.log(error)
        res.json({
            status:false,
            error:error
        })
    }
}
const selectedlocation=async(req,res) =>{
    try {
        const id=req.params.id
        const selected = await Location.findByPk(id);
        if(!selected){
            return res.status(404).send({
                status:false,
                message:"404 not found"
            })
        }
        res.status(200).send({
            status:true,
            data:selected
        })
    } catch (error) {
        res.json({
            status:false,
            error:error
        })
    }
}
const createLocation=async (req,res) =>{
    try {
        const userdata={
            parentId:req.body.parentId,
            name:req.body.name,
            postalCode:req.body.postalCode,
        }
        const createData= await Location.create(userdata)
        res.status(200).send({
            status:true,
            data:createData
        })
    } catch (error) {
        res.json({
            status:false,
            error:error
        })
    }
}
const updateLocation=async(req,res) =>{
    try {
        const id=req.params.id
        const findId=await Location.findByPk(id)
        if(!findId){
           return res.status(404).send({
            status:false,
            message:"404 Not Found"
            })
        }
        const updateData={
            parentId:req.body.parentId,
            name:req.body.name,
            postalCode:req.body.postalCode,
        }
        await Location.update(updateData,{where : {id:id}})
        const data=await Location.findByPk(id)
        console.log(data)
        res.status(200).send({
            status:true,
            message:"Updated Successfully",
            data:data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status:false,
            error:error
        })
    }
}
const deleteLocation=async(req,res) =>{
    try {
        const id=req.params.id
        const findId=await Location.findByPk(id)
        if(!findId){
          return  res.status(404).send({
                status:false,
                message:"404 not found data"
            })
        }
        await Location.destroy({where:{id}})
        const data=Location.findAll();
        res.status(200).send({
            status:true,
            message:"Deleted Successfully"
        })
    } catch (error) {
        
    }
}
module.exports={
    alllocation,
    selectedlocation,
    createLocation,
    updateLocation,
    deleteLocation
}
const db=require("../../database/models/index")
const User=db.User

const displayUser=async(req,res) =>{
    try {
      const alluser= await User.findAll()
      res.status(200).send({
        status:true,
        data:alluser
      })
    } catch (error) {
      res.json({
        status:false,
        error:error
      })
    }
  }
  const selectedUser=async(req,res) =>{
    try {
      const id=req.params.id;
      const selectUser=await User.findbyPk(id)
      res.status(200).send({
        status:true,
        data:selectUser
      })
    } catch (error) {
      res.json({
        status:false,
        error:error
      })
    }
  }
  // const createUser=async (req,res) =>{
  //   try {
  //     const createData={
  //       firstName:req.body.firstName,
  //       lastName:req.body.lastName,
  //       nickName:req.body.nickName,
  //       uniqueName:req.body.uniqueName,
  //       email:req.body.email,
  //       phone:req.body.phone,
  //       password:bcrypt.hashSync(password, 8),
  
  //     }
  //   } catch (error) {
      
  //   }
  // }

  module.exports={
    displayUser,
    selectedUser
  }
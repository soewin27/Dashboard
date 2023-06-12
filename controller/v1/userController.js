const db=require("../../database/models/index")
const User=db.User
const Post=db.Post

const allUsers= async(req,res) => {
    try {
        const users=await User.findAll();
        const count=users.length
        const activeUsers=await User.findAll({where:{accountStatus:'activate'}});
        const activeCount=activeUsers.length
        const deactiveUsers=await User.findAll({where:{accountStatus:'deactivate'}});
        const deactiveCount=deactiveUsers.length
        const suspendUsers=await User.findAll({where:{accountStatus:'suspended'}});
        const suspendCount=suspendUsers.length
        const posts = await Post.findAll({
            where: {
              status: '1',
              deletedAt: null
            }
          });
          
        const postCount=posts.length
        res.json({
            status: true,
            message: "Total Count",
            totalusers: count,  
            activeUsers:activeCount,
            deactiveUsers:deactiveCount,
            suspendedUsers:suspendCount,
            postCount:postCount
          });
    } catch (error) {
        res.json({
          status: false,
          error: error,
        });
    }
}

module.exports={
    allUsers,
}


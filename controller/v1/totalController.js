const db = require("../../database/models/index");
const User = db.User;
const Post = db.Post;
const dateFilter = require("../../helpers/dateFilter");
const { Op } = require("sequelize");
const allUsers = async (req, res) => {
  try {
    const { from, to } = req.query;
    const wherefilter=dateFilter.dateFilter(from,to)
    const filter =await User.findAll({ where: wherefilter });
    const count=filter.length
    const activeUsers =await  User.findAll({
      where:{
      [Op.and]:[
        wherefilter,
        {accountStatus:"ACTIVATE"}
      ]
    }})
    const activeCount = activeUsers.length;
    const deactiveUsers = await User.findAll({
      where:{
      [Op.and]: [
        wherefilter,
        { accountStatus: "DEACTIVATE" }
      ]
      }
    });
    const deactiveCount = deactiveUsers.length;
    const suspendUsers = await User.findAll({
      where:{
        [Op.and]:[
          wherefilter, 
        {accountStatus: "SUSPENDED"}
        ]
      }
    });
    const suspendCount = suspendUsers.length;
    const posts = await Post.findAll({
      where: {
        [Op.and]:[
          wherefilter,
          {status: "1",
          deletedAt: null,}
        ]
      },
    });
    const postCount = posts.length;
    res.json({
      status: true,
      message: "Total Count",
      totalusers: count,
      activeUsers: activeCount,
      deactiveUsers: deactiveCount,
      suspendedUsers: suspendCount,
      postCount: postCount,
      // data: filter,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      error: error,
    });
  }
};

module.exports = {
  allUsers,
};

const db = require("../../database/models/index");
const User = db.User;
const dateFilter = require("../../helpers/dateFilter");
const { Op } = require("sequelize");
const displayUser = async (req, res) => {
  try {
    const alluser = await User.findAll();
    res.status(200).send({
      status: true,
      data: alluser,
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
    });
  }
};
const selectedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const selectUser = await User.findbyPk(id);
    res.status(200).send({
      status: true,
      data: selectUser,
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
    });
  }
};
const createUser=async(req,res) => {
  try {
    const userData={
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      nickName:req.body.nickName,
      uniqueName:req.body.uniqueName,
      email:req.body.email,
      phone:req.body.phone,
      password:req.body.password
    }
    const userCreate=await User.create(userData)
    res.status(200).send({
      status:true,
      message:"User created successfully",
      data:userCreate
    })
  } catch (error) {
    res.json({
      status:false,
      error:error
    })
  }
}
const filterUser = async (req, res) => {
  try {
    const { from, to ,search } = req.query;
    console.log(search)
    const whereclause = dateFilter.dateFilter(from, to);
    // const filter = await User.findAll({ where: whereclause });
    // const count = filter.length;
    // const search = req.params.key;
    // console.log(search)
    const searchData = await User.findAll({
      where: {
        [Op.or]: [
          {
            [Op.or]: [
              { firstName: { [Op.regexp]: search } },
              { lastName: { [Op.regexp]: search } },
              { nickName: { [Op.regexp]: search } },
              { uniqueName: { [Op.regexp]: search } },
              { email: { [Op.regexp]: search } },
            ],
          },
          whereclause,
        ],
      },
    });
    const filtercount = searchData.length;
    res.status(200).send({
      status: true,
      message: "success",
      count: filtercount,
      data: searchData,
    });
  } catch (error) {
    console.log(error)
    res.json({
      status: false,
      error: error,
    });
  }
};
// const searchUser = async (req, res) => {
//   try {
//     const search = req.params.key;
//     const searchData = await User.findAll({
//       where: {
//         [Op.or]: [
//           { firstName: { [Op.regexp]: search } },
//           { lastName: { [Op.regexp]: search } },
//           { nickName: { [Op.regexp]: search } },
//           { uniqueName: { [Op.regexp]: search } },
//           { email: { [Op.regexp]: search } },
//         ],
//       },
//     });
//     console.log(searchData);
//     const searchcount = searchData.length;
//     res.status(200).send({
//       status: true,
//       count: searchcount,
//       data: searchData,
//     });
//   } catch (error) {
//     res.json({
//       status: false,
//       message: "search fail",
//       error: error,
//     });
//   }
// };
module.exports = {
  displayUser,
  selectedUser,
  filterUser,
  createUser
};

const db = require("../../database/models/index");
const User = db.User;
const dateFilter = require("../../helpers/dateFilter");
const { Op } =require("sequelize")
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

const filterUser = async (req, res) => {
  try {
    const { from, to } = req.query;
    const whereclause = dateFilter.dateFilter(from, to);
    const filter = await User.findAll({ where: whereclause });
    const count = filter.length;
    res.status(200).send({
      status: true,
      message: "success",
      count: count,
      data: filter,
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
    });
  }
};
const searchUser = async (req, res) => {
  try {
    const search = req.params.key;
    const searchData = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `${search}` } },
          { lastName: { [Op.like]: `${search}` } },
          { nickName: { [Op.like]: `${search}` } },
          { uniqueName: { [Op.like]: `${search}` } },
          { email: { [Op.like]: `${search}` } },
        ],
      },
    });
    res.status(200).send({
      status: true,
      data: searchData,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "search fail",
      error: error,
    });
  }
};
module.exports = {
  displayUser,
  selectedUser,
  filterUser,
  searchUser,
};

const moment = require("moment");
const { Op } = require("sequelize");

const dateFilter =  (from,to) => {
  let whereclause = {};
  if (from && to) {
    whereclause = {
      createdAt: {
        [Op.gte]: moment(from),
        [Op.lte]: moment(to).add(1, "d"),
      },
    };
  } else if (from) {
    whereclause = {
      createdAt: {
        [Op.gte]: moment(from),
      },
    };
    console.log(moment(from))
  } else if (to) {
    whereclause = {
      createdAt: {
        [Op.lte]: moment(to).add(1, "d"),
      },
    };
  } else {
    whereclause = {};
  }
  return whereclause;
};

module.exports = { 
    dateFilter 
};

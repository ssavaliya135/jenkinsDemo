const model = require("../index");
const moment = require("moment");

var search = async (req, res) => {
  try {
    var From = new Date(req.body.From);
    var To = new Date(req.body.To);
    var result = await model.LeaveModel.find();
    var a=[]
    var r = result.filter((ele) => {
      var d = new Date(ele.sDate);
      if (d.getTime() >= From.getTime() && d.getTime() <= To.getTime()) {
        var z = moment(ele.sDate).format("YYYY-MM-DD");
        var y = moment(ele.eDate).format("YYYY-MM-DD");
        var obj = {
          _id: ele._id,
          email: ele.email,
          sDate: z,
          eDate: y,
          title: ele.title,
          description: ele.description,
          noLeave: ele.noLeave,
          status: ele.status,
          lType: ele.lType,
          halfDay: ele.halfDay,
        };
        a.push(obj)
      }
    });
    console.log(a);
    res.render("admin", { record: a });
  } catch (err) {
    console.log(err);
  }
};

module.exports = search;

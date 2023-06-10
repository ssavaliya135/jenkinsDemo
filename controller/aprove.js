const model = require("../index");
const moment=require("moment")

var aprove= async (req, res) => {
    try {
      var id = req.params.id;
      var userdata = await model.LeaveModel.findByIdAndUpdate(id,{status:"Approved"});
      var data=await model.LeaveModel.find()
      var result=data.map(ele => {
          var z=moment(ele.sDate).format("YYYY-MM-DD")
          var y=moment(ele.eDate).format("YYYY-MM-DD")
          var obj={
            _id:ele.id,
            email:ele.email,
            sDate: z,
            eDate: y,
            title: ele.title,
            description: ele.description,
            noLeave: ele.noLeave,
            status: ele.status,
            lType: ele.lType,
            halfDay: ele.halfDay,
          }
          return obj
      })
      if (!userdata) {
        throw new Error("no documet found");
      }
      res.render("admin", { record: result });
    } catch (err) {
      if (err) throw err;
    }
  }


  var cancle= async (req, res) => {
    try {
      var id = req.params.id;
      var userdata = await model.LeaveModel.findByIdAndUpdate(id,{status:"Cancelled"});
      var data=await model.LeaveModel.find()
      var result=data.map(ele => {
        // console.log(ele.sDate);
        var z=moment(ele.sDate).format("YYYY-MM-DD")
        var y=moment(ele.eDate).format("YYYY-MM-DD")
        let obj={
          _id:ele.id,
          email:ele.email,
          sDate: z,
          eDate: y,
          title: ele.title,
          description: ele.description,
          noLeave: ele.noLeave,
          status: ele.status,
          lType: ele.lType,
          halfDay: ele.halfDay,
        }
        console.log(obj);
        return obj
    })
    res.render("admin", { record: result });
    // console.log(result);
    if (!userdata) {
      throw new Error("no documet found");
    }
    
    } catch (err) {
      if (err) throw err;
    }
  }
  module.exports={aprove,cancle}
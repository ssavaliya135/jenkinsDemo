const model = require("../index");
const moment=require("moment")

var add= async (req, res) => {
    try {
        console.log(req.body.sdate);
      var mydata = model.JoiSchema.validate(req.body, {
        abortEarly: false,
      });
    //   console.log(mydata);
      if (!mydata.error) {
        let data = await model.LeaveModel(mydata.value);
        var a=moment(data.sDate).format("YYYY-MM-DD")
        var b=moment(data.eDate).format("YYYY-MM-DD")
        var c=moment(a)
        var d=moment(b)
        var days=d.diff(c,"days");
        data.noLeave=days
        await data.save();
        let result = await model.LeaveModel.find({ email: req.body.email }).sort({
          _id: -1,
        });
        var r=result.map(ele => {
          var z=moment(ele.sDate).format("YYYY-MM-DD")
          var y=moment(ele.eDate).format("YYYY-MM-DD")
          ele.sDate=z
          ele.eDate=y
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
        res.render("list", { title: req.body.email, record: r });
      } else {
        
        let result = await model.LeaveModel.find({ email: req.body.email }).sort({
          _id: -1,
        });
        var r=result.map(ele => {
        
          var z=moment(ele.sDate).format("YYYY-MM-DD")
          var y=moment(ele.eDate).format("YYYY-MM-DD")
          ele.sDate=z
          ele.eDate=y
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
        res.render("list", { title: req.body.email, record: r });
      }
    } catch (err) {
      if (err) throw err;
      res.redirect("/");
    }
  }

  
 module.exports=add
  
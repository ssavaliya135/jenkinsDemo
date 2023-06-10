const model = require("../index");
const moment=require("moment")
 var login=async (req, res)=>{
    try {
      const result = await model.usermodel.findOne({ email: req.body.email });
      if (req.body.password == result.password) {
        if(req.body.email=="admin@gmail.com"){
            let data=await model.LeaveModel.find()
            var r=data.map(ele => {
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
            res.render("admin",{record:r})
          }else{
            let data = await model.LeaveModel.find({ email: req.body.email }).sort({
                _id: -1,
              });
              var r=data.map(ele => {
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
                res.render("list", { title: req.body.email, record: r});
          }
        
      }
       else {
        res.redirect("/");
      }
    } catch (err) {
      if (err) throw err;
    }
 }


 module.exports=login
const model = require("../index");

var data = async (req, res) => {
  try {
    var mydata = await model.UserJoiSchema.validate(req.body, {
      abortEarly: false,
    });
    if (!mydata.error) {
      var result = await model.usermodel(mydata.value);
      console.log(result);
      await result.save();
    } else {
      res.send(mydata.error);
    }
  } catch (err) {
    if (err) throw err;
  }
};

module.exports = data;

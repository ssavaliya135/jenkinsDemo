const Joi = require('joi').extend(require('@joi/date'))
const { boolean } = require('joi');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mydb',(err,client)=>{
    if(!err) {
        console.log("successful connection with the server");  
    }
    else{
        console.log("Error in the connectivity");}
})

const LeaveSchema = new mongoose.Schema({
    email: {type: String, required: true},
    sDate : Date,
    eDate : Date,
    title : String,
    description : String,
    noLeave :{type:Number,default:0},
    status:{type:String,default:"Pending"},
    lType:String,
    halfDay:String
},
{
    collection : 'task-3'
})

const LeaveModel = mongoose.model('task-3', LeaveSchema)


const JoiSchema = Joi.object({
    email:Joi.string().min(5).max(50).email({tlds: { allow: true }}),
    sDate : Joi.date().format('YYYY-MM-DD').min(Date.now()),
    eDate : Joi.date().format('YYYY-MM-DD').min(Joi.ref('sDate')),
    title : Joi.string(),
    description : Joi.string(),
    noLeave : Joi.number(),
    status:Joi.string().valid("Approved","Cancelled","Pending"),
    lType:Joi.string(),
    halfDay:Joi.string()
})

const userSchema = new mongoose.Schema(
    {
      Username: {type: String, required: true},
      email: {type: String, required: true, unique: true},
      password: {type: String}
    },
    {
      collection: "Leave-user",
    }
  );
  
  const UserJoiSchema = Joi.object({
    Username: Joi.string().min(3),
    email: Joi.string().min(5).max(50).email({tlds: { allow: true }}),
    password : Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")).required(),
    
    
  });
  
  const usermodel = mongoose.model("Leave-user", userSchema);



module.exports = {LeaveModel, JoiSchema,usermodel,UserJoiSchema}
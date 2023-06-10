const express = require("express");
const router = express.Router();
const login=require("./controller/login")
const data=require("./controller/data")
const add=require("./controller/add")
const {aprove,cancle}=require("./controller/aprove")
const search=require("./controller/search")
const usersearch=require("./controller/usersearch")

router.get("/", async (req, res) => {
  res.redirect("index.html");
});
router.post("/add",add);
router.post("/login",login);
router.post("/data",data);
router.get("/aprove/:id",aprove);
router.get("/cancle/:id",cancle);
router.post("/search",search)
router.post("/usersearch",usersearch)




module.exports = router;

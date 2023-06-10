const express = require("express");
const app = express();
const path = require("path");
const moment = require("moment");
const router=require("./route")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/",router)
app.listen(5500)
const route = require("express").Router();
const { loginExpire } = require("../../helpers/middleware");
const {
  getDetail,
  createDetail,
  updateDetail,
  updateStatus,
  deleteDetail,
  getSingleDetail,
  login,
  dashboard,
  home,
  logout,
} = require("./customers.controller");

route.get("/", home);
route.get("/getDetail", getDetail);
route.post("/createDetail", createDetail);
route.post("/updateDetail", updateDetail);
route.post("/updateStatus", updateStatus);
route.get("/deleteDetail/:id", deleteDetail);
route.get("/getSingleDetail/:id", getSingleDetail);
route.post("/login", login);
route.get("/dashboard", loginExpire, dashboard);
route.get("/logout", logout);

module.exports = route;

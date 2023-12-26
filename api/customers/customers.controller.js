const {
  dbGetDetail,
  dbCreateDetail,
  dbUpdateDetail,
  dbUpdateStatus,
  dbDeleteDetail,
  dbGetSingleDetail,
  dbLogin,
} = require("./customers.services");
const { genSaltSync, hashSync, compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  home: (req, res) => {
    res.render("index.ejs", {
      title: "Home Page",
      message: req.flash("message"),
    });
  },

  getDetail: (req, res) => {
    dbGetDetail((error, results) => {
      if (error) {
        return res.json({ status: "false", message: "Something went wrong!" });
      }
      if (!results) {
        return res.json({
          status: "false",
          message: "Data not found!",
          data: [],
        });
      }

      return res.json({
        status: "true",
        message: "Data found SuccessFully!",
        data: results,
      });
    });
  },

  createDetail: (req, res) => {
    let body = req.body;
    let salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    dbLogin(body, async (error, results) => {
      if (error) {
        req.flash("message", "error");
        return res.redirect("/");
      }
      if (results) {
        req.flash("message", "error");
        return res.redirect("/");
      } else {
        dbCreateDetail(body, (error, results) => {
          if (error) {
            req.flash("message", "error");
            return res.redirect("/");
          }

          if (results.affectedRows > 0) {
            req.flash("message", "create");
            return res.redirect("/");
          } else {
            req.flash("message", "error");
            return res.redirect("/");
          }
        });
      }
    });
  },

  updateDetail: (req, res) => {
    let body = req.body;
    dbUpdateDetail(body, (error, results) => {
      if (error) {
        req.flash("message", "error");
        return res.redirect("/dashboard");
      }

      if (results.affectedRows > 0) {
        req.flash("message", "update");
        return res.redirect("/dashboard");
      } else {
        req.flash("message", "error");
        return res.redirect("/dashboard");
      }
    });
  },

  updateStatus: (req, res) => {
    let body = req.body;
    dbUpdateStatus(body, (error, results) => {
      if (error) {
        req.flash("message", "error");
        return res.redirect("/dashboard");
      }

      if (results.affectedRows > 0) {
        req.flash("message", "update");
        return res.redirect("/dashboard");
      } else {
        req.flash("message", "error");
        return res.redirect("/dashboard");
      }
    });
  },

  deleteDetail: (req, res) => {
    let id = req.params.id;

    dbDeleteDetail(id, (error, results) => {
      if (error) {
        return res.json({ status: "false", message: "Something went wrong!" });
      }
      if (results.affectedRows > 0) {
        req.session.destroy();
        return res.redirect("/");
      }

      return res.json({
        status: "false",
        message: "Data not Delete, Something went wrong!",
      });
    });
  },

  getSingleDetail: (req, res) => {
    let id = req.params.id;
    dbGetSingleDetail(id, (error, results) => {
      if (error) {
        return res.json({ status: "false", message: "Something went wrong!" });
      }
      if (!results) {
        return res.json({
          status: "false",
          message: "Data not found!",
          data: [],
        });
      }

      return res.json({
        status: "true",
        message: "Data found SuccessFully!",
        data: results,
      });
    });
  },

  login: async (req, res) => {
    let body = await req.body;
    dbLogin(body, async (error, results) => {
      if (error) {
        req.flash("message", "error");
        return res.redirect("/");
      }
      if (!results) {
        req.flash("message", "error");
        return res.redirect("/");
      }

      let newResult = await compare(body.password, results.password);
      if (!newResult) {
        req.flash("message", "error");
        return res.redirect("/");
      } else {
        results.password = await undefined;
        let token = sign({ id: results }, "accessTokenSecret", {
          expiresIn: "1h",
        });

        session = await req.session;
        session.userId = await results.id;

        req.flash("message", "login");
        return res.redirect("/dashboard");
      }
    });
  },

  dashboard: async (req, res) => {
    session = await req.session;
    let id = await session.userId;
    if (id) {
      dbGetSingleDetail(id, (error, results) => {
        if (error) {
          console.log(error);
          return res.json({
            status: "false",
            message: "Something went wrong!",
            error: error,
          });
        }

        res.render("login/dashboard.ejs", {
          title: "Customer Dashboard",
          details: results,
          message: req.flash("message"),
        });
      });
    } else {
      return res.redirect("/logout");
    }
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
};

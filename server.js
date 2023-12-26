require("dotenv").config();
const express = require("express");
const app = express();
var path = require("path");
var session = require("express-session");

const cookieParser = require("cookie-parser");
const toastr = require("express-toastr");
const flash = require("connect-flash");

app.use(cookieParser("NotSoSecret"));
app.use(flash());
app.use(toastr());

const routing = require("./api/customers/customers.routes");

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine(".ejs", require("ejs").__express);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    resave: true, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
    secret: "sessionSecretKey",
    // cookie: { maxAge: 60000 },
    cookie: { maxAge: 3600000 },
  }),
);

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist")),
);

//Routes
app.use(routing);

app.use((error, req, res, next) => {
  console.log("server error->>>>>>", error.stack);
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/views/missing_page.html");
});

app.use((req, res, next) => {
  res.send("Page Not found");
});

module.exports = app;

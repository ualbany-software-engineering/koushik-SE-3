const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var User = require("./UserModel");
const session = require("express-session");
var bodyParser = require("body-parser");

const uri =
  "mongodb+srv://kelvin:AMIfFlO8Xb0jLK74@cluster0.qhv14bw.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
    /*
    User.deleteMany({},function(err,docs){
      if (err) {

      }else{
        console.log("deleted all")
      }
    })
    */
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

const app = express();
const oneMin = 1000 * 60 * 10;
//session middleware
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneMin },
    resave: false,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.name) return next();
  else res.redirect("/login");
}

app.use("/", express.static(path.join(__dirname, "build")));

app.post("/userLogin", function (req, res) {
  console.log("userLogin");
  console.log(req.body);
  User.findOne(
    { name: req.body.name, password: req.body.password },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.json({ ok: false, error: err });
      } else if (!docs) {
        res.json({ ok: false, error: "not found" });
      } else {
        req.session.name = docs.name;
        req.session.about = docs.about;
        req.session.image = docs.image;
        req.session.password = docs.password;
        res.json({ ok: true, found: docs });
      }
    }
  );
});

app.post("/userRegister", function (req, res) {
  console.log("userRegister");
  console.log(req.body);
  var new_user = new User(req.body);
  new_user.save(function (err, docs) {
    if (err) {
      console.log(err);
      res.json({ ok: false, error: err });
      return;
    } else {
      console.log(docs);
      req.session.name = docs.name;
      req.session.about = docs.about;
      req.session.image = docs.image;
      req.session.password = docs.password;
      res.json({ ok: true, found: docs });
      return;
    }
  });
});

app.post("/userUpdate", function (req, res) {
  console.log("userUpdate");
  User.updateOne(
    { name: req.body.name, password: req.body.password },
    req.body.mods,
    function (err, docs) {
      if (err) {
        console.log(err);
        res.json({ ok: false, error: err });
      } else if (docs.modifiedCount === 0 ) {
        console.log("not found")
        res.json({ ok: false, error: "not found" });
      } else {
        console.log(docs)
        req.session.name = req.body.mods.name;
        req.session.about = req.body.mods.about;
        req.session.image = req.body.mods.image;
        res.json({ ok: true, found: req.body.mods });
      }
    }
  );
});

app.get("/all", function (req, res) {
  console.log("all");
  User.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      res.json({ ok: false });
      return;
    } else {
      console.log(res);
      console.log("Result : ", docs);
      res.json({ ok: true, found: docs });
      return;
    }
  });
});

app.get("/userLogout", function (req, res) {
  console.log("userLogout");
  req.session.name = "";
  req.session.about = "";
  req.session.image = "";
  req.session.password = "";
  return res.json({});
});

app.get("/session", function (req, res) {
  console.log("session");
  if (req.session && req.session.name && req.session.name !== "") {
    res.json({
      ok: true,
      found: {
        name: req.session.name,
        about: req.session.about,
        image: req.session.image,
        password: req.session.password,
      },
    });
  } else {
    res.json({ ok: false });
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

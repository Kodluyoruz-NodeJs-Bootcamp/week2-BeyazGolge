const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const apiRoute = require("./routes/apiRoute");
const User = require("./models/user");
const config = require("./config/config").get(process.env.NODE_ENV);

// const pageRoute = require("./routes/pageRoute");

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static("public"));

//Database connection
mongoose
  .connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to db succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  const user = req.cookies.auth
    ? await User.findOne({ token: req.cookies.auth })
    : null;

  res.status(200).render("index", {
    userIN: !!user,
  });
});

app.use("/api", apiRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("App is live");
  console.log(process.env.NODE_ENV);
  console.log(process.env.SECRET);
  console.log(process.env.DATABASE);
});

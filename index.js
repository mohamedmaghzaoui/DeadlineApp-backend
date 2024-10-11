//backend code
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors"); //used to connect between frontend and backend for localhost
app.use(express.json());
app.use(cors());
//Routers
const eventRouters = require("./routes/event");
const usersRouters = require("./routes/user");
app.use("/events", eventRouters);
app.use("/users", usersRouters);

//create and connect to database using config.json and the models
const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("server is running on port 3001");
  });
});


const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
//Routers
const eventRouters = require("./routes/event");

app.use("/events", eventRouters);
//create and connect to database using config.json and the models
const db = require("./models");

const eventRouter = require("./routes/event");
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server is running on port 3001");
  });
});

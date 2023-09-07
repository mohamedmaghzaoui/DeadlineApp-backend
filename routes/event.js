const express = require("express");
const eventRouter = express.Router();
const { Events } = require("../models");

console.log({ Events });
//get request
eventRouter.get("/", async (req, res) => {
  const listOfEvents = await Events.findAll();
  res.json(listOfEvents);
});
//post request
eventRouter.post("/", async (req, res) => {
  const event = req.body;
  await Events.create(event);
  res.json("data sent");
});

module.exports = eventRouter;

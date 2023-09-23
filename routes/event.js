const express = require("express");
const eventRouter = express.Router();
const { Events } = require("../models");
const { validateToken } = require("./auth");

console.log({ Events });
//get request when requestion data
eventRouter.get("/", async (req, res) => {
  //fetch all events from mysql db
  const listOfEvents = await Events.findAll();
  //return all events in json format
  res.json(listOfEvents);
});
//update request
eventRouter.put("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body;
    const event = await Events.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.update(updatedEventData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the event" });
  }
});
//delete request
eventRouter.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    await Events.destroy({
      where: { id: eventId },
    });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the event" });
  }
});
//post request when adding event
eventRouter.post("/", async (req, res) => {
  //get the event
  const event = req.body;
  //add event to db
  await Events.create(event);
  res.json("data sent");
});

module.exports = eventRouter;

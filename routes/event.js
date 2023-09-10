const express = require("express");
const eventRouter = express.Router();
const { Events } = require("../models");

console.log({ Events });
//get request when requestion data
eventRouter.get("/", async (req, res) => {
  //fetch all events from mysql db
  const listOfEvents = await Events.findAll();
  //return all events in json format
  res.json(listOfEvents);
});
//delete request
eventRouter.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    // Perform the event deletion logic here, using the eventId
    // For example, you can use Sequelize to delete the event from the database.
    // Replace this with your actual deletion logic.
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

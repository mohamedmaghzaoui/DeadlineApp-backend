const express = require("express");

const eventRouter = express.Router();
const { Events } = require("../models");
const { validateToken } = require("./auth"); //middelware
const { sendMail } = require("./sendEmail"); //send mail notification

console.log({ Events });
//get request to fetch all events
eventRouter.get("/", validateToken, async (req, res) => {
  //fetch all events from mysql db
  const listOfEvents = await Events.findAll();
  //return all events in json format
  res.json(listOfEvents);
});
//update request
eventRouter.put("/:id", validateToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEventData = req.body;
    //get event title to send in with the email
    const event = await Events.findByPk(eventId);
    const eventTitle = event.title;
    //send email when modifying event
    const message = `bonjour vous avez recur un nouveau notification,vous avez  nouveau echancier le ${eventTitle} qui est modifier `;
    sendMail(message);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    //modify event
    await event.update(updatedEventData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the event" });
  }
});
//delete request
eventRouter.delete("/:id", validateToken, async (req, res) => {
  try {
    //delete event using eventId
    const eventId = req.params.id;
    const event = await Events.findByPk(eventId);
    //send mail when deleting event
    const eventTitle = event.title;
    const message = `bonjour vous avez recur un nouveau notification,vous avez un echancier le ${eventTitle} qui est supprimer `;
    sendMail(message);

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
eventRouter.post("/", validateToken, async (req, res) => {
  //get the event from user
  const event = req.body;
  const eventTitle = event.title;
  //send mail when adding an new event
  const message = `bonjour vous avez recur un nouveau notification,vous avez un echancier le ${eventTitle} qui est ajouter `;
  sendMail(message);
  //add event to db
  await Events.create(event);
  res.json("data sent");
});

module.exports = eventRouter;

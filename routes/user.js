//imprt express for routing and functions
const express = require("express");
const userRouter = express.Router(); //user Router
const { Users } = require("../models"); //users table
const { createToken } = require("./jwt");
const { validateToken } = require("./auth");

//for hashing
const bcrypt = require("bcrypt");
//get requst to fetch users
userRouter.get("/register", validateToken, async (req, res) => {
  try {
    //dont get password
    const listOfUsers = await Users.findAll({
      attributes: ["id", "name", "role", "email"], // Specify the fields you want to include
    });

    res.json(listOfUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json("an error accured while fetching users");
  }
});
//delte request to delete user using userId
userRouter.delete("/register:id", validateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    await Users.destroy({
      where: { id: userId },
    });
    res.json("user deleted");
  } catch (err) {
    res.json("error while deleting: ", err);
  }
});

//post request to login new user
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      // User does not exist, send an error response
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!user.hashedPassword) {
      // Handle the case where the user doesn't have a hashed password (e.g., database issue)
      return res.status(500).json({ error: "User data is invalid" });
    }
    //compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      // Passwords do not match, send an error response
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = createToken(user);

    res.json(token);
  } catch (err) {
    console.error(err);

    // Handle other errors (e.g., database errors) here
    return res
      .status(500)
      .json({ error: "An error occurred while logging in" });
  }
});

//post request to add new user
userRouter.post("/register", validateToken, async (req, res) => {
  try {
    const { name, role, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      // Email already exists, send an error response
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the saltRounds (10) as needed
    await Users.create({
      name,
      role,
      email,
      hashedPassword: hashedPassword, // Store the hashed password in the database
    });
    res.send("user is added succesfully");
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ err: "An error occurred while registring user" });
  }
});
module.exports = userRouter;

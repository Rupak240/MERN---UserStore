const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");

const User = require("../model/User");

// @route   GET api/users
// @desc    Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users
// @desc    Add new user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    try {
      const newUser = new User({
        name,
        email,
      });

      const user = await newUser.save();

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/users/:id
// @desc    Update user
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/users/:id
// @desc    Delete user
router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: "User removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

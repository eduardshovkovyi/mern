const { Router } = require("express");
const router = Router();
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");

    const { from } = req.body;

    const code = shortid.generate();

    const owner = req.user.user;

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Somethings error... Try again" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.user });
    console.log("links", links);
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ message: "Somethings error... Try again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Somethings error... Try again" });
  }
});

module.exports = router;

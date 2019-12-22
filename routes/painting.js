const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const User = require('../models/User');
const Event = require('../models/Event');


const multer = require("multer");

const parser = require("./../config/cloudinary");


router.post("/", parser.single("photo"), (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
    }
    const imageUrl = req.file.secure_url;
    console.log(imageUrl);
    res.json(imageUrl).status(200);
  });


module.exports = router;
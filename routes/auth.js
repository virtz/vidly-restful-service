
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash')
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send("Invalid email or password.");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password.");

       const token = user.generateAuthToken();
        res.send(token);

    } catch (ex) {
        console.log(ex);
    }
});

function validate(req) {
    const complexityOptions = {
        min: 5,
        max: 255,
        lowerCase: 1,
        upperCase: 2,
        numeric: 2,
        symbol: 1,
        requirementCount: 4

    };
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }
    return Joi.validate(req, schema);
}

module.exports = router;

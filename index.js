const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/expense-app');

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body)
    try {
        //save body contents in variable
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: newPassword
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ err, error: 'Duplicate email' })
    }
})


app.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    })
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (validPassword) {
        const token = jwt.sign({
            username: user.username
        }, 'secret123')
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.listen(1337, () => {
    console.log('Server started on 1337');
})
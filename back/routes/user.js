const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: { email: req.body.email },
        });
        if (!exUser) {
            return res.status(400).send("이미 사용 중인 아이디입니다.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname,
        });
        res.status(201).send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: { email: req.body.email },
        });
        if (!exUser) {
            return res.status(400).send("존재하지 않는 아이디입니다.");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;

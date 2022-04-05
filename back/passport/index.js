const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

// passport 설정파일, app.js에서 실행함.
module.exports = () => {
    // req.login(user, () => {}) 에 user가 여기로 들어옴 .
    // 세션에 쿠키랑 아이디만 담아두기
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 담아둔 아이디로 유저 정보 가져오기
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id } });
            // req.user에 유저 정보가 담김
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    // LocalStrategy
    local();
};

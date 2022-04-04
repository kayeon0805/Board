const passport = require("passport");
const local = require("./local");

// passport 설정파일, app.js에서 실행함.
module.exports = () => {
    passport.serializeUser(() => {});

    passport.deserializeUser(() => {});

    // LocalStrategy
    local();
};

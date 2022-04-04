const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

// 로그인 전략, routes/user.js에서 실행함.
module.exports = () => {
    passport.use(
        // 객체와 함수가 들어감.
        new LocalStrategy(
            {
                /* 
                    LoginForm에서 서버에 요청할 때 전송하는 데이터의 이름을 적음
                    req.body.email, req.body.password
                */
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    // 사용자가 존재하는지 확인
                    const user = await User.findOne({
                        where: { email },
                    });
                    if (!user) {
                        // 순서: 서버 에러, 성공 여부, 클라이언트 에러
                        return done(null, false, {
                            reason: "존재하지 않는 사용자입니다.",
                        });
                    }
                    // 비밀번호 비교
                    const result = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (result) {
                        // 성공에 사용자 정보 넘겨주기
                        return done(null, user);
                    }
                    return done(null, false, {
                        reason: "비밀번호가 틀렸습니다..",
                    });
                } catch (error) {
                    console.error(error);
                    // 서버 에러
                    return done(error);
                }
            }
        )
    );
};

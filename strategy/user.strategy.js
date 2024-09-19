const path = require("path");
const passport = require("passport");
const User = require("../models/People");
const { Strategy } = require("passport-jwt");

module.exports = () => {
  const cookieExtractor = (req) => {
    let token = null;

    if (req && req.signedCookies) {
      token = req.signedCookies[process.env.COOKIE_NAME];
    }

    return token;
  };

  passport.use(
    "jwt",
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: cookieExtractor,
      },
      (payload, done) => {
        console.log(payload, "jwt");

        User.findOne({ email: payload.email }).then((user) => {
          if (user) return done(null, payload);

          return done(null, false);
        });
      },
    ),
  );
};

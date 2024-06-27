const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; //for username password authentication
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

passport.use(new LocalStrategy({
  usernameField: 'email', // this is the name of the field in the request body
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) return done(null, false, { message: 'Incorrect email' });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) return done(null, false, { message: 'Incorrect password' });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret' // Make sure to use a secure secret in a real application
};

module.exports = {
  authenticate: passport.authenticate('jwt', { session: false }),
  authorize: (role) => {
    return (req, res, next) => {
      if (!req.user || (role !== req.user.role && !role.includes(req.user.role))) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      next();
    };
  }
};

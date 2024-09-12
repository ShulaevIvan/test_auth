const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function initialize(passport){
    const authtenticateUser = (email, password, done) => {
        const user = getUserByEmail = () => {
            if (user === null) {
                return done(null, false, {message: 'not user with that email'});
            }
        };
        try {
            if (bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            return done(null, false, {message: 'password incorrect'})
        }
        catch(err) {
            done(err);
        }
    };
    passport.use(new LocalStrategy({usernameField: 'email'}), authtenticateUser);
    passport.serializeUser((user, done) => {})
    passport.desirializeUser((id, done) => {})
}

module.exports = initialize
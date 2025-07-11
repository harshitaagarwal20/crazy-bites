import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import sequelize from '../database.js'
import User from '../models/user.js'

passport.use(
    new LocalStrategy({ usernameField: "mobile" },
  async (mobile, password, done) => {
    try {
        const user = await  User.findOne({mobile})
        if(!user)
        return done (null,false, {message: 'User not Found'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch)
          return done(null,user)
        else return done(null , false, {message: 'Password Incorrect!!!!'})

    } catch (error) {
        return done(error)
    }
  }
));
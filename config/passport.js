/**
 * Created with JetBrains RubyMine.
 * User: rajshekar
 * Date: 31/5/15
 * Time: 10:10 PM
 * To change this template use File | Settings | File Templates.
 */
var LocalStrategy = require('passport-local').Strategy;

//load user model
var User = require('../models/user');

module.exports = function(passport){
    console.log("passport");
    //need to serialize user for sessions
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    //used to deserialize user
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true //allows us to passback the entire request to the callback
       },
        function(req, email,password,done){
            console.log("This is post request");
            process.nextTick(function(){
                //check users email already exists
                User.findOne({'local.email': email}, function(err,user){
                    if(err){
                        console.log("ERROR");
                        return done(err);
                    }

                    //check if there is already a user with that email
                    if(user)
                    {
                        return done(null,false, req.flash('signupmessage','This email is already taken'));
                    }
                    else{
                        console.log("else");
                        //save the user
                        var newuser = new User();
                        newuser.local.email = email;
                        newuser.local.password = newuser.generateHash(password);

                        //save user
                        newuser.save(function(err)
                        {
                            if(err)
                                throw err;

                            return done(null,newuser);

                        })
                    }
                })
            })
        }
    ))
}

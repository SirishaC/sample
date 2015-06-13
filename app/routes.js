/**
 * Created with JetBrains RubyMine.
 * User: rajshekar
 * Date: 31/5/15
 * Time: 6:01 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(app,passport){


    /*var auth = function (req, res, next) {
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.send(401);
        };

        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        };

        if (user.name === 'foo' && user.pass === 'bar') {
            return next();
        } else {
            return unauthorized(res);
        };
    };
      */

    //Home Page
    app.get('/', function(req,res){
        res.render('index.ejs');
    });

    //Login Page
    app.get('/login',function(req,res){
        res.render('login.ejs',{message: req.flash('login message')});
    });

    //Post login form
    app.post('/signup',passport.authenticate('local',{
        successRedirect : '/profile', //redirect to the secure profile section
        failureRedirect : '/signup' , //redirect back to the signup page if there is an error
        failureFlash : true
    }));

    //Signup Page
    app.get('/signup', function(req,res){
        res.render('signup.ejs',{message: req.flash('signup page message')});
    });



}
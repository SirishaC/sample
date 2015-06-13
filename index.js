/**
 * Created with JetBrains RubyMine.
 * User: rajshekar
 * Date: 15/4/15
 * Time: 6:44 AM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var passport = require('passport');
var flash = require('connect-flash');
var basicAuth = require('basic-auth');

//var done = false;

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./config/database.js');


//mongoose.connect('mongodb://localhost:27017/sample_development');
//configuration
mongoose.connect(configDB.url); //connect to db

//Express setup
app.use(morgan('dev')); //to log every request to the console
app.use(cookieParser());

//setup ejs for templating
app.set('view engine', 'ejs');
//app.engine('html',require('ejs').renderFile);

//session setup
app.use(session({secret: 'sirisession'}))
app.use(passport.initialize());
app.use(passport.session());   //persistent session
app.use(flash());

//routes
require('./app/routes.js')(app,passport);
//require('./app/user.js')(app,basicAuth);
require('./config/passport.js')(passport);



app.use('/static',express.static('public'));
app.set('views',__dirname+'/views');

//upload feature
/*app.use(multer({dest: './uploads', onFileUploadStart: function(file){
        console.log(file.originalname + "is starting...")
    },
    onFileUploadComplete: function(file){
        console.log( ' uploaded to  ' + file.path);
        done = true;
    }
}
));
 */
/*
var User = require('./models/user');
//app.use('/static',express.static('public'));
app.use(express.static('public',{'etag': true}));

app.set('case sensitive routing', true);
app.set('views',__dirname+'/views');

var userRouter = express.Router();
app.locals.title = "Node JS Test App";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 */

//app.all('*',auth, userRouter);

//Basic Authentication
/*var auth = express.basicAuth(function(user,password,callback)
{
    var result = (user === '' && password === '');
    callback(null, result);
})
  */
/*userRouter.use(function(req,res,next)
{
    console.log(req.method, req.url);
    next();
    //res.end("You dont have sufficient privileges to use this page");

});

userRouter.get('/',function(req, res)
{
    var users = User.findOne(function(err, record)
    {
        if(err)
            console.log("Err");
        else
            res.json(record);
    });
})

userRouter.get('/form',function(req,res)
{
    res.render(path.join(__dirname + '/views/login.html'));
})

userRouter.post('/create',function(req,res)
{
    var usr = new User();
    var values = req.body;

    console.log(req.xhr);

    usr.username = values.username;
    usr.password = values.password;
    usr.save(function(err)
    {
        if(err){
            //if(err)
                return res.json({status: 'failed', message: err.message}) ;
            //else
             //   return res.send(err) ;
        }
        res.redirect('/user');

    });
})

userRouter.get('/uploadform', function(req,res){
    res.render(path.join(__dirname + '/views/upload.html'));
})


userRouter.post('/upload', function(req,res)
{
    if(done==true){
        console.log(req.files);
        res.redirect('/user/uploadform');
        res.end("File uploaded.");

    }

})
*/

/*userRouter.param('name',function(req,res,next,name)
{
    console.log("Using param "+ name);
    req.name = name;
    next();

})*/
/*app.get('/', function(req, res)
{
    //res.sendFile(path.join(__dirname + '/app/views/userList.html'));
    //res.render(path.join(__dirname + '/app/views/userList.html'));
    console.log(app.locals.title);
    res.cookie('cookiename','siri', { domain: '.example.com', secure: true });
    sessionvar = req.session;
    res.send(app.locals.title);

    console.log(req.cookies);
    console.log(req.subdomains);
    console.log(req.session);

});
*/
/*adminRouter.get('/who_am_i', function(req, res)
{
    //res.send("Sireesha Challa");
    res.status(500).json({ user: 'sirisha' });
    // res.json({user: 'sirisha'});

});*/
/*userRouter.get('/:name', function(req,res)
{
    res.cookie('name','siri',{maxAge: '5000000'});
    res.send(req.params.name + "Welcome to admin Dashboard");

    console.log("Using param "+ req.name);
});
 */

/*app.route('/login').get(function(req, res)
{
    console.log("This is get request");
    res.send("You are a Get request");

}).post(function(req,res){
        console.log("This is post request");
        res.send('You are a post request');
    })
app.use('/user',userRouter);

*/
app.listen(8082);
console.log("Server starting...");


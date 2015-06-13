/**
 * Created with JetBrains RubyMine.
 * User: rajshekar
 * Date: 3/6/15
 * Time: 7:19 AM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(app,basicAuth){

    var auth = function (req, res, next) {
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.send(401);
        };

        var user = basicAuth(req);

        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        };

        if(req.url === '/login')
        console.log(req.url);
        if (user.name === 'foo' && user.pass === 'bar') {
            return next();
        } else {
            return unauthorized(res);
        };
    };
    app.all('*',auth);
    app.get('/user', function(req,res)
    {
        res.send(200);
    })

}

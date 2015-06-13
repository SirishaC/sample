/**
 * Created with JetBrains RubyMine.
 * User: rajshekar
 * Date: 20/4/15
 * Time: 10:44 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


/*var UserSchema = new Schema({name: String,
                              username: {type: String, required: false, index: {unique: true}},
                                password: {type: String, required: true, select: false}}

);
  */

var UserSchema = new Schema(
    {
        local           : {
            email        : String,
            password     : String
        },
        facebook         : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        },
        twitter          : {
            id           : String,
            token        : String,
            displayName  : String,
            username     : String
        },
        google           : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        }

    }
);


//Generating Hash
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8,null));
};
// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports =  mongoose.model('User', UserSchema);


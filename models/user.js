//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('UserSchema',userSchema)
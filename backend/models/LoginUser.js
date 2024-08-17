const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notes:[],
},
{
    timestamps:true
});

const LoginUser = mongoose.model("UserLogin",UserSchema);
module.exports = LoginUser;

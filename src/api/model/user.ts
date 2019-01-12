import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type : String,
        required : true,
        minlength: 6,
        maxlength: 25,
        trim: true
    },
    lastName: {
        type : String,
        required : true,
        minlength: 6,
        maxlength: 25,
        trim: true
    },
    email : {
        type : String,
        required : true,
        trim: true
    },
    dob : {
        type : Date,
        required : true
    },
    city : {
        type : String,
        required : true,
        trim: true
    },
    password : {
        type : String,
        required : true,
        trim: true
    }
})


export const User = mongoose.model("User", UserSchema)

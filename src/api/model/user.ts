import * as mongoose from 'mongoose';
import * as bcryptJs from 'bcryptjs';

const Schema = mongoose.Schema;
const salt: any = process.env.SALT_ROUNDS;

const AddressSchema = new Schema({
    addressLine1: {
        type: String,
        required: false,
        trim: true
    },
    addressLine2: {
        type: String,
        required: false,
        trim: true
    },
    city: {
        type: String,
        required: false,
        trim: true
    },
    pin: {
        type: String,
        required: false,
        trim: true
    }
});

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 25,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 25,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: false,
        trim: true
    },
    addressInfo: AddressSchema
});


UserSchema.pre('save', function (next) {
    const User: any = this;

    if (User.isModified('password')) {
        bcryptJs.genSalt(salt, (err: Error, salt: string) => {
            bcryptJs.hash(User.password, salt, (err: Error, hash: string) => {
                if (err)
                    throw err;

                User.password = hash;
                next();
            });
        });
    }

});


export const User = mongoose.model("User", UserSchema)

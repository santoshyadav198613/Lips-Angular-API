import * as mongoose from 'mongoose';
import * as bcryptJs from 'bcryptjs';

const Schema = mongoose.Schema;
const salt: any = process.env.SALT_ROUNDS;

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
    }
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

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 25,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    mfd: {
        type: Date,
        required: true
    }
});

export const Product = mongoose.model("Product", ProductSchema)

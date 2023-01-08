const mongoose = require("mongoose");
const AddToCart = mongoose.Schema({
    owner: String,
    image: String,
    name: String,
    price: Number,
    updatedPrice: Number,
    quatity: {
        type: Number,
        default: 1
    },
    orderPlaced: {
        type:Boolean,
        default:false
    },
    orderStatus: {
        type: String,
        default: "Order successfully placed.Waiting for response from admin side."
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Add to cart', AddToCart);
const express = require("express");
const router = express.Router();
const AddToCart = require("../models/addtocart");

// Add to cart
router.post("/addtocart", async (req, res) => {
    try {
        const add = await AddToCart.create({
            owner: req.body.owner,
            image: req.body.image,
            name: req.body.name,
            price: req.body.price,
            updatedPrice: req.body.price
        });
        res.status(200).json(add);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Get all orders in cart
router.post("/getallcart", async (req, res) => {
    try {
        const orders = await AddToCart.find({ "owner": req.body.owner })
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Increase quautity of pizzas
router.post("/increasequantity", async (req, res) => {
    try {
        const { quatity, price } = await AddToCart.findById(req.body.id);
        const orders = await AddToCart.findByIdAndUpdate(req.body.id, { quatity: quatity + 1, updatedPrice: (quatity + 1) * price });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Decrease quantity of pizzas
router.post("/decreasequantity", async (req, res) => {
    try {
        const { quatity, price } = await AddToCart.findById(req.body.id);
        const orders = await AddToCart.findByIdAndUpdate(req.body.id, { quatity: quatity - 1, updatedPrice: (quatity - 1) * price });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Delete a order from cart
router.post("/deletefromcart", async (req, res) => {
    try {
        const order = await AddToCart.findByIdAndDelete(req.body.id);
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Confirm a order
router.post("/placeorder", async (req, res) => {
    try {
        const order = await AddToCart.findByIdAndUpdate(req.body.id, { orderPlaced: true }, { runValidators: true, new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Delete all from cart after a order is placed
router.post("/deleteallfromcart", async (req, res) => {
    try {
        const order = await AddToCart.deleteMany({ owner: req.body.email });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message);

    }
});

// Get all placed orders
router.post("/getallorders", async (req, res) => {
    try {
        const order = await AddToCart.find({ orderPlaced: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Update status of orders placed from admin side
router.post("/updatestatus", async (req, res) => {
    try {
        const order = await AddToCart.findByIdAndUpdate(req.body.id, { orderStatus: req.body.status }, { runValidators: true, new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json(error.message);
    }
})
module.exports = router;
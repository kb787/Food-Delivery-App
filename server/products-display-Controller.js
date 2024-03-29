const { finished } = require("nodemailer/lib/xoauth2");
const productModel = require("./products-model");

const handleDisplayWithoutFilter = async (req, res) => {
  try {
    const response = await productModel.find();
    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.json({
      message: `Unable to get the response due to error ${error}`,
      status: 500,
    });
  }
};

const handleDisplayWithThreeFilters = async (req, res) => {
  try {
    const response = await productModel.find({
      deliveryTime: req.body.productDeliveryTime,
      pricing: req.body.productRate,
      type: req.body.productType,
    });
    if (!response) {
      return res.json({ message: "No products found", status: 404 });
    } else {
      res.send(response);
    }
  } catch (error) {
    return res.json({
      message: `Unable to get the response due to error ${error}`,
      status: 500,
    });
  }
};

const handleDisplayWithChoosenCriteria = async (req, res) => {
  try {
    if (req.query.productDeliveryTime) {
      const findResponse = await productModel.find({
        deliveryTime: req.body.productDeliveryTime,
      });
      if (!findResponse) {
        return res.json({ message: "No product found", status: 404 });
      } else {
        res.send(findResponse);
      }
    }
    if (req.query.productDeliveryFee) {
      const findResponse = await productModel.find({
        deliveryFee: req.body.productDeliveryFee,
      });
      if (!findResponse) {
        return res.json({ message: "No product found", status: 404 });
      } else {
        res.send(findResponse);
      }
    }
    if (req.query.productType) {
      const findResponse = await productModel.find({
        type: req.body.productType,
      });
      if (!findResponse) {
        return res.json({ message: "No product found", status: 404 });
      } else {
        res.send(findResponse);
      }
    }
  } catch (error) {
    return res.json({
      message: `Unable to get the response due to error ${error}`,
      status: 500,
    });
  }
};

const express = require("express");
const generalRouter = express.Router();
generalRouter.get("/product/display-all", handleDisplayWithoutFilter);
module.exports = { generalRouter: generalRouter };

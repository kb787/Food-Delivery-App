const productModel = require("../models/products-model");

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
    const { productRate, productType, productName } = req.query;
    let filteredProducts;
    const generalData = await productModel.find();
    if (productRate) {
      filteredProducts = generalData.filter(
        ((product) => product.productRate < productRate) ||
          ((product) => product.productRate === productRate)
      );
    }
    if (productType) {
      filteredProducts = generalData.filter(
        (product) => product.productType === productType
      );
    }
    if (productName) {
      filteredProducts = generalData.filter(
        (product) => product.productName === productName
      );
    }
    if (!filteredProducts) {
      return res.json({ message: "No products found", status: 404 });
    } else {
      return res.send(filteredProducts);
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
const categoryRouter = express.Router();
generalRouter.get("/product/display-all", handleDisplayWithoutFilter);
categoryRouter.get(
  "/product/display-category",
  handleDisplayWithChoosenCriteria
);
module.exports = {
  generalRouter: generalRouter,
  categoryRouter: categoryRouter,
};

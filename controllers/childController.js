// childController.js
const Child = require("../models/childModel");

exports.getAllChildren = async (req, res, next) => {
  try {
    const children = await Child.find();
    res.status(200).json({ data: children });
  } catch (error) {
    next(error);
  }
};

exports.getChildById = async (req, res, next) => {
  try {
    const child = await Child.findById(req.params.id);
    if (!child) {
      throw new Error("Child not found");
    }
    res.status(200).json({ object: child });
  } catch (error) {
    next(error);
  }
};

exports.insertChild = async (req, res, next) => {
  try {
    const newChild = new Child(req.body);
    await newChild.save();
    res.status(200).json({ data: newChild });
  } catch (error) {
    next(error);
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const updatedChild = await Child.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedChild) {
      throw new Error("Child not found");
    }
    res.status(200).json({ updatedChild });
  } catch (error) {
    next(error);
  }
};

exports.deleteChild = async (req, res, next) => {
  try {
    const deletedChild = await Child.findOneAndDelete({ _id: req.params.id });
    if (!deletedChild) {
      throw new Error("Child not found");
    }
    res.status(200).json({ message: "Child deleted successfully" });
  } catch (error) {
    next(error);
  }
};

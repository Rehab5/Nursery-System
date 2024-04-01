// classController.js
const Class = require("../models/classModel");

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ data: classes });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const classObject = await Class.findById(req.params.id);
    if (!classObject) {
      throw new Error("Class not found");
    }
    res.status(200).json({ object: classObject });
  } catch (error) {
    next(error);
  }
};

exports.insertClass = async (req, res, next) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(200).json({ data: newClass });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const updatedClass = await Class.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      throw new Error("Class not found");
    }
    res.status(200).json({ updatedClass });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const deletedClass = await Class.findOneAndDelete({ _id: req.params.id });
    if (!deletedClass) {
      throw new Error("Class not found");
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllClassChildren = async (req, res, next) => {
  try {
    const classObject = await Class.findOne({ _id: req.params.id }).populate('children');
    if (!classObject) {
      throw new Error("Class not found");
    }
    if (!classObject.children || classObject.children.length === 0) {
      return res.status(200).json({ message: "No children found for this class" });
    }
    res.status(200).json({ children: classObject.children });
  } catch (error) {
    next(error);
  }
};

exports.getAllSupervisors = async (req, res, next) => {
  try {
    const classObject = await Class.findById(req.params.id).populate('supervisor');
    if (!classObject) {
      throw new Error("Class not exists");
    }
    if (!classObject.supervisor) {
      return res.status(200).json({ message: "No supervisor assigned to this class" });
    }
    res.status(200).json({ supervisors: classObject.supervisor });
  } catch (error) {
    next(error);
  }
};

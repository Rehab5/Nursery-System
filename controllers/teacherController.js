// teacherController.js
const Teacher = require("../models/teacherModel");
const bcrypt = require("bcrypt")

// Get all teachers
exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ data: teachers });
  } catch (error) {
    next(error);
  }
};

// Get a single teacher by ID
exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    res.status(200).json({ object: teacher });
  } catch (error) {
    next(error);
  }
};

// Add a new teacher
exports.insertTeacher = async (req, res, next) => {
  // res.json({body:req.body,file:req.file})
  try {
    const newTeacher = new Teacher(req.body);
    if (req.file) {
      newTeacher.image = req.file.path;
    }
    await newTeacher.save();
    res.status(200).json({ data: newTeacher });
  } catch (error) {
    next(error);
  }
};

// Update a teacher
exports.updateTeacher = async (req, res, next) => {
  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTeacher) {
      throw new Error("Teacher not found");
    }
    res.status(200).json({ updated: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

// Delete a teacher
exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teacher.findOneAndDelete({ _id: req.params.id });
    if (!deletedTeacher) {
      throw new Error("Teacher not found");
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all class supervisors
exports.getAllClassSupervisors = async (req, res, next) => {
  try {
    const classes = await classSchema.find({}, { _id: 0, name: 1 }).populate({
      path: "supervisor",
      select: "fullname",
    });
    const supervisors = classes.map((classSupervisor) => classSupervisor.supervisor);
    res.status(200).json({ supervisors, message: "Class supervisors retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

exports.changePasswordUser = (req, res, next) => {
  const { _id } = req.user;
  const { currentPassword, password } = req.body;

  User.findById({ _id }, { password: 1 })
    .then((data) => {
      if (!data) throw new Error("User not found");

      const checkPassword = bcrypt.compareSync(currentPassword, data.password);
      if (!checkPassword) throw new Error("Invalid password");

      const hashPassword = bcrypt.hashSync(password, +process.env.BUFFER);

      return User.updateOne({ _id }, { $set: { password: hashPassword } });
    })
    .then((data) => {
      if (!data.modifiedCount) throw new Error("Change Password Fail");
      res.status(200).json({ message: "Password changed successfully" });
    })
    .catch((err) => next(err));
};


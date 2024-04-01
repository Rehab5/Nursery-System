// authController.js
const TeacherSchema = require("./../models/teacherModel");
const ChildSchema = require("./../models/childModel");
const jwt = require("jsonwebtoken");
const { comparePassword, hashPassword } = require("../MiddleWare/hashPassword");

exports.login = async (req, res, next) => {
    try {
        const teacher = await TeacherSchema.findOne({ email: req.body.email });
        if (teacher) {
            const isPasswordCorrect = await comparePassword(req.body.password, teacher.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Not Authenticated, Incorrect email or password" });
            }
            const token = generateToken(teacher._id, "teacher");
            return res.json({ message: "Login successful", token: token });
        }

        const child = await ChildSchema.findOne({ email: req.body.email });
        if (child) {
            const isPasswordCorrect = await comparePassword(req.body.password, child.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Not Authenticated, Incorrect email or password" });
            }
            const token = generateToken(child._id, "child");
            return res.json({ message: "Login successful", token: token });
        }

        return res.status(401).json({ message: "Not Authenticated, Incorrect email or password" });
    } catch (error) {
        next(error);
    }
};


function generateToken(userId, role) {
    return jwt.sign(
        {
            _id: userId,
            role: role,
        },
        process.env.SECRET_KEY || "Nursery System App",
        { expiresIn: "24hr" }
    );
}

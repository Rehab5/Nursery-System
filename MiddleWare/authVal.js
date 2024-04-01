// authValidator.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.get("authorization");
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            throw new Error("Authorization header is missing or malformed");
        }

        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRETKEY);
        req.token = decodedToken;
        console.log(decodedToken)
        next();
    } catch (error) {
        error.message = "Not Authenticated";
        next(error);
    }
};

module.exports.isAuthorized = (...allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.token.role;
        if (!userRoles.some((r) => allowedRoles.includes(r))) {
            return res.status(403).json({ message: "You are not authorized" });
        }
        next();
    };
};

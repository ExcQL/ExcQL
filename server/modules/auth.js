const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const auth = {};
// Compares passwords to the hashed bcrypt password
auth.comparePasswords = (password, hashedPw) => {
    return bcrypt.compare(password, hashedPw);
};
// Hashes password with a salt factor of 5
auth.hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};
// Protects API routes based on logic inside the try block
auth.protect = async (req, res, next) => {
    try {
        // Logic to check if the user is valid or a session is valid
    } catch (error) {
        return next({
            log: `Authentication: auth.protect ${error}`,
            status: 400,
            message: { err: error },
        });
    }
};
auth.createJWT = (user) => {
    const token = jwt.sign(
        {
            // Insert keyvalue pairs that we want to sign to each user
        },
        process.env.JWT_SECRET
    );
    return token;
};
modules.export = auth;

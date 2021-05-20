const jwt = require("jsonwebtoken");

const jwtsign = (id) => {
    const payload = {
        user: {
            id: id
        }
    }

    try {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "15 seconds",
        });
    return token;
    } catch (error) {
        return error
    }
}

module.exports = {
    jwtsign
}
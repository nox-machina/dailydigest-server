const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.cookies['token'];

    if (!token) return res.status(401).send({error: {message: "Unauthorized Request."}});

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).clearCookie("token")
        // .redirect('/auth/google')
        .send({error: error.message})
    }
}
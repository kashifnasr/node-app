import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.redirect("/login");
        }

        const verified = jwt.verify(
            token,
            "mySecretKey"
        );

        req.user = verified;

        next();

    } catch (error) {

        res.redirect("/login");
    }
};

export default authMiddleware;

import bcrypt from "bcrypt"
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config({
    path: "../.env"
});
const register = async (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).send({ error: "You must provide email and password and name!" });
    let user = null;
    const existUser = await User.findOne({
        $or: [{ email }]
    })
    if (existUser) {
        return res.status(409).send("User already exists");
    }
    user = await User.create({
        email,
        name,
        password: bcrypt.hashSync(password, 10)
    })
    if (user) {
        return res.status(200).json({
            token: jwt.sign({
                _id: user._id,
                email: user.email,
            }, process.env.SECRET)
        }).send();
    } else {
        console.log(err);
        return res.status(500).send();
    }
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Email or password is incorrect" });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Email or password is incorrect' });
                    }
                    req.user = user;
                    res.status(200).json({
                        token: jwt.sign({
                            _id: user._id,
                            email: user.email,
                        }, process.env.SECRET)
                    }).send();
                })
                .catch(err => console.log(err));
        })
}
export { login, register }
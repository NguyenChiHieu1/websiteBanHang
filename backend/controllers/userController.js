import userModel from "../models/userModel.js";
import { validationResult } from "express-validator";
import { comparePassword, createToken, hashedPassword } from "../services/authServices.js";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const { name, email, password } = req.body;
            // if (!name) throw new Error("Thông tin name để trống!!!");
            // if (!email) throw new Error("Thông tin email để trống!!!");
            // if (!password) throw new Error("Thông tin password để trống!!!");

            const emaiExit = await userModel.findOne({ email });
            if (!emaiExit) {
                const hashed = await hashedPassword(password);
                const userData = await userModel.create({
                    name,
                    email,
                    password: hashed
                });

                const token = await createToken({
                    id: userData._id,
                    name: userData.name
                });

                return res.status(200).json({ msg: 'Your account has been created!', token });
            } else {
                return res.status(500).json({ errors: [{ msg: `${email} is already token`, param: 'email' }] })
            }
        } catch (error) {
            console.log(error);
            return res.status(400).json("Server internal error!");
        }
    } else {
        return res.status(400).json({ msg: errors.array() });
    }
};

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const { email, password } = req.body;

            const userLogin = await userModel.findOne({ email });
            if (userLogin) {
                if (await comparePassword(password, userLogin.password)) {
                    const token = await createToken({ id: userLogin._id, name: userLogin.name });
                    if (userLogin.admin) {
                        return res.status(201).json({ token, admin: true });
                    } else {
                        return res.status(201).json({ token, admin: false });
                    }
                } else {
                    return res.status(400).json({ errors: [{ msg: "password not matched", param: 'password' }] });
                }
            } else {
                return res.status(400).json({ errors: [{ msg: `${email} is not found`, param: 'email' }] });
            }
        } catch (error) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
};
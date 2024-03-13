//bdypt: Blowfish Cryptography-mã hóa mật khẩu
import bcrypt from "bcrypt";
import env from "../config/envConfig.js";
//jwt tạo token có thể được sử dụng để xác thực người dùng và truy cập các tài nguyên bảo vệ trên các ứng dụng web.
import jwt from "jsonwebtoken";

//mã hóa mật khẩu bằng salt 
export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

//tạo token: để xác thực
export const createToken = (user) => {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: '7d' });
};

//so sanh mat khau
export const comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
};

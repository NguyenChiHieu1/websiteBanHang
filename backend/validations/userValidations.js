import { body } from "express-validator";

export const registerValidations = [
    //.isEmpty(): Kiểm tra xem trường dữ liệu có rỗng không. rong->true,khong rong->false
    //not().isEmpty(): nguoc lai
    body('name').notEmpty()
        //trim(): loai bỏ khoảng trống đầu cuối
        .trim()
        //.escape() được sử dụng để mã hóa các ký tự đặc biệt trong chuỗi, đảm bảo rằng chuỗi đầu vào là an toàn và không thể thực hiện các cuộc tấn công injection
        .escape().withMessage('name is required'),
    body('email').notEmpty().isEmail().normalizeEmail().trim().escape().withMessage('email is required'),
    body('password').isLength({ min: 5 }).withMessage('password should be 5 characters long')
];

export const loginValidations = [
    body('email').notEmpty().isEmail().normalizeEmail().trim().escape().withMessage("Email is required!!"),
    body('password').notEmpty().withMessage("Password is required!")
];
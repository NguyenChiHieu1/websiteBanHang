import mongoose from "mongoose";
import env from "./envConfig.js";

// export default được sử dụng khi bạn muốn xuất một giá trị duy nhất từ một module. 
const connect = async (req, res) => {
    try {
        // Chúng ta đã thiết lập serverSelectionTimeoutMS là 5000 mili giây (tức là 5 giây).
        // Điều này có nghĩa là nếu Mongoose không thể kết nối đến máy chủ MongoDB trong vòng 5 giây, nó sẽ ném ra một lỗi.
        const conn = await mongoose.connect(env.URL, {
            serverSelectionTimeoutMS: 5000,
        });
        if (!conn) throw new Error('Connecting to database failed');
        console.log("Database Connected!!");
    } catch (err) {
        //Khi bạn gọi process.exit(), quá trình Node.js hiện tại sẽ kết thúc và trả về mã thoát 0. 
        //Bạn cũng có thể chuyển một mã thoát cụ thể như là đối số của process.exit() để chỉ định một mã thoát cụ thể.
        console.log(err);
        process.exit;
        // mongoose.exit;
    }
};
export default connect;
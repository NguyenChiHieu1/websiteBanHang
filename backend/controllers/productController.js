import productModel from "../models/productModel.js";
import { uuidv4 } from "uuid";
import fs from "fs";

export const create = async (req, res) => {
    //Sử dụng formidable để phân tích dữ liệu form gửi từ client.
    //for mid able
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (!err) {
            //fields: chuoi JSON -> object
            const parsedData = JSON.parse(fields.data);
            const errors = [];
            if (parsedData.title.trim().length === 0) errors.push({ msg: "Tiêu đề là bắt buộc" });
            if (parseInt(parsedData.price) < 1) errors.push({ msg: "Giá là bắt buộc" });
            if (parseInt(parsedData.discount) < 0) errors.push({ msg: "Giảm giá không được âm" });
            if (parseInt(parsedData.stock) < 20) errors.push({ msg: "Số lượng hàng tồn kho trên 20" });
            if (parsedData.descriptions.trim().length === 0) errors.push({ msg: "Mô tả là bắt buộc" });

            //Sau khi ktra điều kiện nhập vào tiếp ktra files -dk: ảnh
            if (errors === 0) {
                // Dòng mã này kiểm tra xem trong các tệp tin được gửi lên, có tệp tin nào có tên là "image1" không
                if (!files[image1]) errors.push({ msg: "Image 1 là bắt buộc" });
                if (!files[image2]) errors.push({ msg: "Image 2 là bắt buộc" });
                if (!files[image3]) errors.push({ msg: "Image 3 là bắt buộc" });

                if (errors.length === 0) {
                    for (let i; i < Object.keys(files).length; i++) {
                        //kiem tra mime cua file ( dinh dang cua tep tin)
                        const mimeType = files[`image${i + 1}`].mimetype;
                        const extension = mimeType.split('/')[1].toLowerCase();
                        if (extension == "jpeg" || extension == "jpg" || extension == "png") {
                            const imageName = uuidv4() + `.${extension}`;
                            const __dirname = path.resolve();
                            const newPath = __dirname + `/../client/public/images/${imageName}`;
                            images[`images${i + 1}`] = imageName;
                            //Đây là cách sao chép tệp hình ảnh từ vị trí tạm thời nơi nó được tải lên vào thư mục lưu trữ của bạn
                            fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            const error = {};
                            error["msg"] = `image${i + 1} has invalid ${extension} type`;
                            errors.push(error);
                        }
                    }

                    if (errors.length === 0) {
                        try {
                            const response = await productModel.create({
                                title: parsedData.title,
                                price: parseInt(parsedData.price),
                                discount: parseInt(parsedData.discount),
                                stock: parseInt(parsedData.stock),
                                category: parsedData.category,
                                colors: parsedData.colors,
                                sizes: JSON.parse(fields.sizes),
                                image1: images["image1"],
                                image2: images["image2"],
                                image3: images["image3"],
                                description: fields.description,
                            });
                            return res.status(201).json({ msg: "Sản phẩm thêm thành công!!!", response });
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json(error);
                        }
                    } else {
                        return res.status(400).json({ errors });
                    }
                } else {
                    return res.status(400).json({ errors });
                }
            }

        }
    });
}
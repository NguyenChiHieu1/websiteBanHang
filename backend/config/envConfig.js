import dotenv from 'dotenv';

dotenv.config();

const env = {
    PORT: process.env.PORT,
    URL: process.env.URL,
    JWT_SECRET: process.env.JWT_SECRET
};
export default env
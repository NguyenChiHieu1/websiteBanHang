import express, { json } from 'express';
import connect from './config/db.js';
import env from './config/envConfig.js';
import cors from 'cors';
import router from './routes/userRoutes.js';

const app = express();
const PORT = env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Connect to MongoDB database

connect().then(
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
).catch(err => console.error(err));

app.use('/api', router);

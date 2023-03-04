import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Production
if (process.env.NODE_ENV === 'production') {
    let __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, "frontend/build")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/build/index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API running successfully...")
    })
}


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}).catch(err => console.log(err.message))


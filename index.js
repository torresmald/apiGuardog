import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './router/apiRoutes.routes.js';
import { connect } from './utils/db/connect.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
      origin: "https://guardog.vercel.app",
    }
  
  });

io.on('connection', (socket) => {
  socket.on('sendMessage', (messageInfo) => {
    socket.broadcast.emit('receiveMessage', messageInfo);
  })
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(apiRouter);

connect();

server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

export default app;

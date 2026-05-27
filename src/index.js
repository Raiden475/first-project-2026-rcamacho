import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { config } from 'dotenv';
import { envs } from './config/envs.js';
import { AppDataSource } from './database/data-source.js';
import { booksRouter } from './routes/books.route.js';
import { uploadRouter } from './routes/upload.route.js';

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), envs.uploads_folder)));
app.use('/books', booksRouter);
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API REST con TypeORM y Multer' });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(envs.port, () => {
      console.log(`Servidor en el puerto ${envs.port}`);
    });
  })
  .catch((error) => {
    console.error('Inicio de base de datos fall�:', error);
    process.exit(1);
  });

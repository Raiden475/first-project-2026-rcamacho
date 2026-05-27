import { AppDataSource } from '../database/data-source.js';
import { Book } from '../entities/book.entity.js';
import { request, response } from 'express';

const getFileUrl = (req, filename) => `${req.protocol}://${req.get('host')}/uploads/${filename}`;

const uploadFile = (req = request, res = response) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, message: 'No se subió ningún archivo.' });
  }

  return res.status(201).json({
    ok: true,
    file: {
      originalName: req.file.originalname,
      filename: req.file.filename,
      url: getFileUrl(req, req.file.filename),
    },
  });
};

const uploadBookCover = async (req = request, res = response) => {
  const id = Number(req.params.id);
  if (!req.file) {
    return res.status(400).json({ ok: false, message: 'No se subió ningún archivo.' });
  }

  const repository = AppDataSource.getRepository(Book);
  const book = await repository.findOneBy({ id });

  if (!book) {
    return res.status(404).json({ ok: false, message: `No se encontró el libro con id ${id}.` });
  }

  book.cover = `/uploads/${req.file.filename}`;
  await repository.save(book);

  return res.status(200).json({ ok: true, data: book });
};

export const uploadController = { uploadFile, uploadBookCover };

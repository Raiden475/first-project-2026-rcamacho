import { request, response } from 'express';
import { AppDataSource } from '../database/data-source.js';
import { Book } from '../entities/book.entity.js';

const getRepository = () => AppDataSource.getRepository(Book);

const getBooks = async (req = request, res = response) => {
  try {
    const books = await getRepository().find();
    return res.status(200).json({ ok: true, data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const getBook = async (req = request, res = response) => {
  const id = Number(req.params?.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ ok: false, message: 'ID de libro inválido.' });
  }

  try {
    const book = await getRepository().findOneBy({ id });

    if (!book) {
      return res.status(404).json({ ok: false, message: `No book available with id ${id}` });
    }

    return res.status(200).json({ ok: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const createBook = async (req = request, res = response) => {
  const { title, author, description } = req.body;

  if (!title || !author) {
    return res.status(400).json({ ok: false, message: 'Title and author are required.' });
  }

  try {
    const book = getRepository().create({ title, author, description });
    await getRepository().save(book);
    return res.status(201).json({ ok: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const updateBook = async (req = request, res = response) => {
  const id = Number(req.params?.id);
  const { title, author, description } = req.body;

  if (Number.isNaN(id)) {
    return res.status(400).json({ ok: false, message: 'ID de libro inválido.' });
  }

  try {
    const repository = getRepository();
    const book = await repository.findOneBy({ id });

    if (!book) {
      return res.status(404).json({ ok: false, message: `No book available with id ${id}` });
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;

    await repository.save(book);
    return res.status(200).json({ ok: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const deleteBook = async (req = request, res = response) => {
  const id = Number(req.params?.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ ok: false, message: 'ID de libro inválido.' });
  }

  try {
    const repository = getRepository();
    const book = await repository.findOneBy({ id });

    if (!book) {
      return res.status(404).json({ ok: false, message: `No book available with id ${id}` });
    }

    await repository.remove(book);
    return res.status(200).json({ ok: true, message: `Book with id ${id} deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const booksController = { getBooks, getBook, createBook, updateBook, deleteBook };

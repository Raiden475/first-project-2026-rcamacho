import AppDataSource from '../../database/datasource.provider.js';
import { BOOK } from '../../config/const.js';

const repository = AppDataSource.getRepository(BOOK);

const getBooks = async (req, res) => {
  try {
    const books = await repository.find();
    return res.status(200).json({ ok: true, data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const getBook = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const book = await repository.findOneBy({ id });
    if (!book) {
      return res.status(404).json({ ok: false, message: `No existe el libro con id ${id}` });
    }
    return res.status(200).json({ ok: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const createBook = async (req, res) => {
  const { name, published } = req.body;
  if (!name) {
    return res.status(400).json({ ok: false, message: 'El nombre del libro es obligatorio.' });
  }

  try {
    const book = repository.create({ name, published });
    await repository.save(book);
    return res.status(201).json({ ok: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const updateBook = async (req, res) => {
  const id = Number(req.params.id);
  const { name, published } = req.body;
  if (Number.isNaN(id)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const book = await repository.findOneBy({ id });
    if (!book) {
      return res.status(404).json({ ok: false, message: `No existe el libro con id ${id}` });
    }

    book.name = name ?? book.name;
    book.published = published ?? book.published;

    await repository.save(book);
    return res.status(200).json({ ok: true, data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ ok: false, message: 'ID inválido' });
  }

  try {
    const book = await repository.findOneBy({ id });
    if (!book) {
      return res.status(404).json({ ok: false, message: `No existe el libro con id ${id}` });
    }

    await repository.softDelete(id);
    return res.status(200).json({ ok: true, message: `Libro con id ${id} eliminado.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const booksController = { getBooks, getBook, createBook, updateBook, deleteBook };

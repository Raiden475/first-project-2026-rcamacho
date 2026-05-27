import express from 'express';
import { booksController } from '../controllers/book.controller.js';

const router = express.Router();

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBook);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

export const booksRouter = router;

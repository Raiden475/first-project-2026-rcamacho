import { Router } from 'express';
import { validate } from '../../middlewares/validator.middleware.js';
import { createBookSchema, updateBookSchema } from './schema/book.schema.js';
import { booksController } from './book.controller.js';

const bookRoutes = Router();

bookRoutes.get('/', booksController.getBooks);
bookRoutes.get('/:id', booksController.getBook);
bookRoutes.post('/', validate(createBookSchema), booksController.createBook);
bookRoutes.put('/:id', validate(updateBookSchema), booksController.updateBook);
bookRoutes.delete('/:id', booksController.deleteBook);

export default bookRoutes;

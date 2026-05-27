import express from 'express';
import { uploadSingle } from '../middlewares/upload.middleware.js';
import { uploadController } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/', uploadSingle.single('file'), uploadController.uploadFile);
router.post('/books/:id', uploadSingle.single('cover'), uploadController.uploadBookCover);

export const uploadRouter = router;

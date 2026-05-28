import Joi from 'joi';

export const createBookSchema = Joi.object({
  name: Joi.string().required(),
  published: Joi.date().optional(),
});

export const updateBookSchema = Joi.object({
  name: Joi.string().optional(),
  published: Joi.date().optional(),
});

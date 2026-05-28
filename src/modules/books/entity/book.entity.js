import { EntitySchema } from 'typeorm';
import { BOOK } from '../../../config/const.js';

// TODO Crear relación con la entidad autor
export const bookEntity = new EntitySchema({
  name: BOOK,
  tableName: 'books',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
      length: 100,
    },
    published: {
      type: 'datetime',
      nullable: true,
    },
    cover: {
      type: 'varchar',
      nullable: true,
      length: 255,
    },
    createDate: {
      type: 'datetime',
      createDate: true,
    },
    deleteDate: {
      type: 'datetime',
      nullable: true,
      deleteDate: true,
    },
  },
});

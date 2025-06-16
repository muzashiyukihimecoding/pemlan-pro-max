import { Book } from './book.js';

export class Ebook extends Book {
  constructor(id, title, author, category) {
    super(id, title, author, category);
    this.type = 'Ebook';
  }
}
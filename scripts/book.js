export class Book {
  static totalBooks = 0;

  constructor(id, title, author, category) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    Book.totalBooks++;
  }
}
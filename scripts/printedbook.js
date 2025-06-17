import { Book } from "./book.js";

export class PrintedBook extends Book {
   constructor(id, title, author, category) {
      super(id, title, author, category);
      this.type = "Printed Book";
   }
}

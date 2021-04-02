import { title } from "node:process";
import { Book } from "../interfaces/book";
import { Filters } from "../interfaces/filters";
import { db, storage } from "./firebase";

class BookController {
  books = new Map<string, Book>();
  filteredBookIds: string[] = [];

  public async getAllBooks(): Promise<Map<string, Book>> {
    return this.resolveQuery(await db.collection("books"));
  }

  public async getBookById(bookId: string): Promise<Map<string, Book>> {
    return await db
      .collection("books")
      .doc(bookId)
      .get()
      .then((doc) => {
        if (doc.data() != undefined) {
          this.books.set(doc.id, doc.data() as Book);
          console.log("book id: ", doc.id, " => ", doc.data());
        } else {
          console.log("No book found with id: ", doc.id);
        }
        return this.books;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        return Promise.reject(error);
      });
  }

  public async getBooksByTitle(title: string): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("title", "==", title)
    );
  }

  public async getBooksByAuthor(author: string): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("author", "==", author)
    );
  }

  public async getBooksByISBN(ISBN: number): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("ISBN", "==", ISBN)
    );
  }

  public async getBooksByCourse(
    subject: string,
    number: number
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db
        .collection("books")
        .where("courseSubject", "==", subject)
        .where("courseNumber", "==", number)
    );
  }

  public async getBooksByUniversity(
    university: string
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("university", "==", university)
    );
  }

  public async advancedSearch(filters: Filters): Promise<Map<string, Book>> {
    if (filters.title != undefined) {
      this.getBooksByTitle(filters.title);
      if (this.filterBooks()) return this.books;
    }

    if (filters.author != undefined) {
      this.getBooksByAuthor(filters.author);
      if (this.filterBooks()) return this.books;
    }

    if (filters.ISBN != undefined) {
      this.getBooksByISBN(filters.ISBN);
      if (this.filterBooks()) return this.books;
    }

    if (filters.year != undefined) {
      this.getBooksByYear(filters.year);
      if (this.filterBooks()) return this.books;
    }

    if (filters.prices != undefined) {
      if (filters.prices.length == 2) this.getBooksInPriceRange(filters.prices[0], filters.prices[1]);
      else if (filters.isAbove) this.getBooksAbovePrice(filters.prices[0]);
      else this.getBooksBelowPrice(filters.prices[0]);

      if (this.filterBooks()) return this.books;
    }

    if (filters.conditions != undefined) {
        this.getBooksByCondition(filters.conditions);
        if (this.filterBooks()) return this.books;
    }

    //TODO finish courseSubject and the rest of the filters below that

    // if (filters.conditions != undefined)
    //   this.getBooksByCondition(filters.conditions);

    return this.books;
  }

  private async getBooksByYear(year: number): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("year", "==", year)
    );
  }

  private async getBooksByCourseSubject(
    subject: string
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("courseSubject", "==", subject)
    );
  }

  private async getBooksByCourseNumber(
    number: Number
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("courseNumber", "==", number)
    );
  }

  private async getBooksAbovePrice(price: number): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("price", ">=", price)
    );
  }

  private async getBooksBelowPrice(price: number): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("price", "<=", price)
    );
  }

  private async getBooksInPriceRange(
    from: number,
    to: number
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db
        .collection("books")
        .where("price", ">=", from)
        .where("price", "<=", to)
    );
  }

  private async getBooksByCondition(
    condition: string[]
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("condition", "in", condition)
    );
  }

  private async getBooksByPageCornersFolded(
    isFolded: boolean
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("pageCornersFolded", "==", isFolded)
    );
  }

  private async getBooksByPagesAnnotated(
    isAnnotated: boolean
  ): Promise<Map<string, Book>> {
    return this.resolveQuery(
      await db.collection("books").where("pagesAnnotated", "==", isAnnotated)
    );
  }

  private resolveQuery(query: any) {
    return query
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          // doc.data() is never undefined for query doc snapshots
          this.books.set(doc.id, doc.data() as Book);
          console.log("book id: ", doc.id, " => ", doc.data());
        });
        return this.books;
      })
      .catch((error: any) => {
        console.log("Error getting documents: ", error);
        return Promise.reject(error);
      });
  }

  private filterBooks(): boolean {
    if (this.filteredBookIds.length == 0) {
      this.books.forEach((value, key) => {
        this.filteredBookIds.push(key.repeat(1));
        return false;
      });
    } else {
      this.books.forEach((value, key) => {
        if (!this.filteredBookIds.includes(key)) {
          this.books.delete(key); // Remove the book with that id
          this.filteredBookIds.splice(this.filteredBookIds.indexOf(key, 0), 1); // Remove the book id
        }
      });
    }

    if (this.filteredBookIds.length == 0) {
      this.books = new Map<string, Book>();
      return true;
    } else return false;
  }
}

// await storage
//   .ref("data_structures_1.jpg")
//   .getDownloadURL()
//   .then((url) => {
//     console.log("img url: ", url);
//   });

//   private fillMap(querySnapshot: any) {
//     querySnapshot.forEach((doc: any) => {
//       // doc.data() is never undefined for query doc snapshots
//       this.books.set(doc.id, doc.data() as Book);
//       console.log("book id: ", doc.id, " => ", doc.data());
//     });

//     return this.books;
//   }

export default BookController;

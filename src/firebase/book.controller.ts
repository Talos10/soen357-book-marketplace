import { Book } from "../interfaces/book";
import { Filters } from "../interfaces/filters";
import { db, storage } from "./firebase";

class BookController {
  books = new Map<string, Book>();
  filteredBookIds: string[] = [];
  nbrFilterTimesCalled : number = 0;

  public async getAllBooks(): Promise<Map<string, Book>> {

    console.log("Fetching all books! Epoch time: ", Date.now());

    return this.resolveQuery(await db.collection("books"));
  }

  public async getBookById(bookId: string): Promise<Map<string, Book>> {

    console.log("Fetching book by id" , bookId, " ! Epoch time: ", Date.now());

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

    console.log("Fetching books by title" , title, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("title", "==", title)
    );
  }

  public async getBooksByAuthor(author: string): Promise<Map<string, Book>> {

    console.log("Fetching books by author" , author, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("author", "==", author)
    );
  }

  public async getBooksByISBN(ISBN: number): Promise<Map<string, Book>> {

    console.log("Fetching book by ISBN" , ISBN, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("ISBN", "==", ISBN)
    );
  }

  public async getBooksByCourse(
    subject: string,
    number: number
  ): Promise<Map<string, Book>> {

    console.log("Fetching books by course (subject = " , subject, " , number = ", number, ")  ! Epoch time: ", Date.now());
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

    console.log("Fetching books by university" , university, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("university", "==", university)
    );
  }

  public async advancedSearch(filters: Filters): Promise<Map<string, Book>> {

    console.log("Advanced search started! Epoch time: ", Date.now());

    if (filters.title != undefined) {
      await this.getBooksByTitle(filters.title);
      if (this.filterBooks()) return this.books;
    }

    if (filters.author != undefined) {
      await this.getBooksByAuthor(filters.author);
      if (this.filterBooks()) return this.books;
    }

    if (filters.ISBN != undefined) {
      await this.getBooksByISBN(filters.ISBN);
      if (this.filterBooks()) return this.books;
    }

    if (filters.year != undefined) {
      await this.getBooksByYear(filters.year);
      if (this.filterBooks()) return this.books;
    }

    if (filters.prices != undefined) {
      if (filters.prices.length == 2) await this.getBooksInPriceRange(filters.prices[0], filters.prices[1]);
      else if (filters.isAbove != undefined) {
        if (filters.isAbove) await this.getBooksAbovePrice(filters.prices[0]);
        else await this.getBooksBelowPrice(filters.prices[0]);
      } 
      if (this.filterBooks()) return this.books;
    }

    if (filters.conditions != undefined) {
      await this.getBooksByCondition(filters.conditions);
      if (this.filterBooks()) return this.books;
    }

    if (filters.courseSubject != undefined) {
      await this.getBooksByCourseSubject(filters.courseSubject);
      if (this.filterBooks()) return this.books;
    }

    if (filters.courseNumber != undefined) {
      await this.getBooksByCourseNumber(filters.courseNumber);
      if (this.filterBooks()) return this.books;
    }

    if (filters.pageCornersFolded != undefined) {
      await this.getBooksByPageCornersFolded(filters.pageCornersFolded);
      if (this.filterBooks()) return this.books;
    }

    if (filters.pagesAnnotated != undefined) {
      await this.getBooksByPagesAnnotated(filters.pagesAnnotated);
      if (this.filterBooks()) return this.books;
    }

    if (filters.university != undefined) {
      await this.getBooksByUniversity(filters.university);
      if (this.filterBooks()) return this.books;
    }

    if (filters.hasPictures != undefined) {
      await this.getBooksThatHavePictures(filters.hasPictures);
      if (this.filterBooks()) return this.books;
    }

    return this.books;
  }

  private async getBooksByYear(year: number): Promise<Map<string, Book>> {

    console.log("Fetching books by year" , year, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("year", "==", year)
    );
  }

  private async getBooksByCourseSubject(
    subject: string
  ): Promise<Map<string, Book>> {

    console.log("Fetching books by course subject" , subject, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("courseSubject", "==", subject)
    );
  }

  private async getBooksByCourseNumber(
    number: Number
  ): Promise<Map<string, Book>> {

    console.log("Fetching books by course number" , number, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("courseNumber", "==", number)
    );
  }

  private async getBooksAbovePrice(price: number): Promise<Map<string, Book>> {

    console.log("Fetching books above price" , price, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("price", ">=", price)
    );
  }

  private async getBooksBelowPrice(price: number): Promise<Map<string, Book>> {

    console.log("Fetching books below price" , price, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("price", "<=", price)
    );
  }

  private async getBooksInPriceRange(
    from: number,
    to: number
  ): Promise<Map<string, Book>> {

    console.log("Fetching books between price " , from, " and price ", to, " ! Epoch time: ", Date.now());

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

    console.log("Fetching books by conditions " , condition, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("condition", "in", condition)
    );
  }

  private async getBooksByPageCornersFolded(
    isFolded: boolean
  ): Promise<Map<string, Book>> {

    console.log("Fetching books by page corners folded " , isFolded, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("pageCornersFolded", "==", isFolded)
    );
  }

  private async getBooksByPagesAnnotated(
    isAnnotated: boolean
  ): Promise<Map<string, Book>> {

    console.log("Fetching books by pages annotated " , isAnnotated, " ! Epoch time: ", Date.now());

    return this.resolveQuery(
      await db.collection("books").where("pagesAnnotated", "==", isAnnotated)
    );
  }

  private async getBooksThatHavePictures(
    hasPictures: boolean
  ): Promise<Map<string, Book>> {

    console.log("Fetching books by having pictures " , hasPictures, " ! Epoch time: ", Date.now());

    return await db.collection("books")
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        if (hasPictures) {
            if (doc.data().images.length != 0) {
            this.books.set(doc.id, doc.data() as Book);
            console.log("book id: ", doc.id, " => ", doc.data());
          }
        }
        else {
          if (doc.data().images.length == 0) {
            this.books.set(doc.id, doc.data() as Book);
            console.log("book id: ", doc.id, " => ", doc.data());
          }
        }
      });
      return this.books;
    })
    .catch((error: any) => {
      console.log("Error getting documents: ", error);
      return Promise.reject(error);
    });
  }

  private resolveQuery(query: any) {

    this.books = new Map<string, Book>();

    return query
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          // doc.data() is never undefined for query doc snapshots
          this.books.set(doc.id, doc.data() as Book);
          console.log("Found book id: ", doc.id, " => ", doc.data());
        });
        return this.books;
      })
      .catch((error: any) => {
        console.log("Error getting documents: ", error);
        return Promise.reject(error);
      });
  }

  // This method compares the ids found from the various queries (one query per given filter).
  // Returning false means we keep continue the advanced search.
  // Returning true means we stop the advanced search.
  private filterBooks(): boolean {
    this.nbrFilterTimesCalled = this.nbrFilterTimesCalled + 1;
    console.log("Filter books just got called! Number of times called: ", this.nbrFilterTimesCalled);
    console.log("The books map looks like this now: ", this.books);
    console.log("The filtered array ids looks like this now: ", this.filteredBookIds);

    // No books were found in the most recent query. Return empty map and end advanced search.
    if (this.books.size == 0) {

      console.log("No books found with this query! The advanced search is over.");
      console.log("Current books in the books map: ", this.books);

      return true;
    }

    // Books were found with the most recent query and the filteredBookIds is empty.
    // This means that this is the first query. Thus, we copy all the ids from the books
    // map into the filteredBookIds array.
    if (this.filteredBookIds.length == 0) {

        console.log("First query! Filling up the filtered ids array.");

        this.books.forEach((value, key) => {
          this.filteredBookIds.push(key.repeat(1));
        });

        console.log("Filtered ids array after filling up: ", this.filteredBookIds);

        return false;
    }
    else { // This is not the first query. We have some books in the map and we have some ids
          // in the filteredBookIds array. Time to compare the ids from the two.

      console.log("Books were found with this query! Comparing ids from array and map!");

      // If an id from the books map is not in the array, delete the key from the map.
      this.books.forEach((value, key) => {
        if (!this.filteredBookIds.includes(key)) {
          console.log("Deleting this key from the map since it's not in the filteredBookIds array: ", key);
          this.books.delete(key); // Remove the book with that id
          // this.filteredBookIds.splice(this.filteredBookIds.indexOf(key, 0), 1); // Remove the book id
        }
      });

      console.log("Book maps after filtering/deleting keys: ", this.books);
    }

    // All books found from the most recent query were eliminated.
    // We thus need to return an empty map since the advanced search is over.
    if (this.books.size == 0) {

      console.log("All books found from the most recent query were eliminated! Ending advanced search.");
      console.log("Current books in the books map: ", this.books);

      return true;
    }
    else { // Some books from the map matched books from the array. We need to keep them
          // and so we have to make sure that the ids from the map are the same as the ids
          // from the filteredBookIds array. We first empty the array and then copy every id
          // left from the map in the array.
      this.filteredBookIds = [];

      this.books.forEach((value, key) => {
        this.filteredBookIds.push(key.repeat(1));
      });

      console.log("Copying all ids from map to filteredBookIds array. Array after copying: ", this.filteredBookIds);
      
      return false;
    }
  }
}

export default BookController;

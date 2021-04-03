import React from 'react';
import './App.css';
import BookController from './firebase/book.controller';
import { Filters } from './interfaces/filters';

var filters : Filters = {
  // pageCornersFolded: false,
  prices: [20],
  isAbove: true,
  // title: "First book!",
  // author: "David Rossi",
  // conditions: ["great", "excellent"],
  // university: "McGill University",
  // hasPictures: false,
  // courseSubject: "MATH",
  // courseNumber: 101,
  // pagesAnnotated: true
}

const getBookById = () => (new BookController()).getBookById("3A9Hx9BUYtqoNhb3xkXj");
const getAllBooks = () => (new BookController()).getAllBooks();
const getAllBooksByTitle = () => (new BookController()).getBooksByTitle("Data Structures and Algorithms");
const getAllBooksByAuthor = () => (new BookController()).getBooksByAuthor("David Rossi");
const getAllBooksByISBN = () => (new BookController()).getBooksByISBN(123456789);
const getAllBooksByCourse = () => (new BookController()).getBooksByCourse("COMP", 352);
const getBooksByUniversity = () => (new BookController()).getBooksByUniversity("Concordia University");
const advancedSearch = () => (new BookController()).advancedSearch(filters);

function App() {
  return (
    <button onClick={() => {
      (advancedSearch()).then((value) => console.log("Function output: ", value));
    }}>Click me!</button>
  );
}

export default App;

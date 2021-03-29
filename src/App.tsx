import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookController from './firebase/book.controller';

const getBook = () => (new BookController()).getBook(1);

function App() {
  return (
    <button onClick={() => getBook()}>Click me!</button>
  );
}

export default App;

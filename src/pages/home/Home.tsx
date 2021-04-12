import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  InputBase,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { Card, Progress, ReturnButton } from '../../components';
import './Home.scss';
import { Search } from '@material-ui/icons';
import bookLogo from '../../assets/logo.png';
import BookController from '../../firebase/book.controller';
import { Book } from '../../interfaces/book';
import { Filters } from '../../interfaces/filters';


export const Home = () => {

  const [searchType, setSearchType] = useState<string>('title');

  const bookController = new BookController();

  var books: Map<string, Book>;
  
  var addedBookId: string;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };
  
  const searchByTitle = async (searchString: string) => {
    const getAllBooksByTitle = () => bookController.getBooksByTitle(searchString);
    books = await getAllBooksByTitle();
  };

  const searchByAuthor = async (searchString: string) => {
    const getAllBooksByAuthor = () => bookController.getBooksByAuthor(searchString);
    books = await getAllBooksByAuthor();
  };

  const searchByISBN = async (searchString: string) => {
    console.log("searchString: ", searchString);
    console.log("searchString as unknown as number: ", searchString);
    const getAllBooksByISBN = () => bookController.getBooksByISBN(parseInt(searchString));
    books = await getAllBooksByISBN();
  };

  const advancedSearch = async (filters: Filters) => {
    const advancedSearch = () => bookController.advancedSearch(filters);
    books = await advancedSearch();
  };

  const addBook = async (book: Book) => {
    const addBook = () => bookController.addBook(book);
    addedBookId = await addBook();

      // Example of book to add:
      // {
      //   title: "How to Make a Life-Size Shrek, a Mario man, and Luigi who is twenty-two",
      //   titleArray: [],
      //   author: "Francois Legault, Jean Lesage, Et. AL",
      //   authorArray: [],
      //   ISBN: Math.floor(Math.random() * 10000001),
      //   year: 2021,
      //   price: 666.6,
      //   condition: "worn",
      //   courseSubject: "TECH",
      //   courseNumber: 514,
      //   pageCornersFolded: true,
      //   pagesAnnotated: true,
      //   university: "Polytechnique",
      //   images: ["https://en.wikipedia.org/wiki/Book#/media/File:Gutenberg_Bible,_Lenox_Copy,_New_York_Public_Library,_2009._Pic_01.jpg"]
      // } as Book);
  };

  const executeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { searchString, searchType } = parseSearch(form);

    switch(searchType){
      case "title":
        await searchByTitle(searchString.trim().toLocaleLowerCase());
        break;
      case "author":
        await searchByAuthor(searchString.trim().toLocaleLowerCase());
        break;
      case "isbn":
        await searchByISBN(searchString.trim());
        break;
    }

    console.log("Here are the books");
    console.log(books);
  };

  const parseSearch = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return {
      searchString: data.get('search') as string,
      searchType: searchType
    };
  };

  return false ? (
    <Progress />
  ) : (
    <div className="Home">
      <div className="home__top">
        <div className="logo">
          <img src={bookLogo}></img>
        </div>

      </div>

      <form onSubmit={executeSearch}>
        <Card className="summary">
          <div className="table__search">
            <InputBase
              className="search"
              placeholder={'Search'}
              name="search"
              id="search"
              startAdornment={<Search />}
              fullWidth
            />
          </div>
          <div className="search__buttons">
            <Button
              color="primary"
              variant="contained"
              type="submit">
              Search
          </Button>
            <FormControl component="fieldset">
              <RadioGroup row value={searchType} onChange={handleChange}>
                <FormControlLabel value={'title'} control={<Radio color="primary" />} label="Title" />
                <FormControlLabel
                  value={'author'}
                  control={<Radio color="primary" />}
                  label="Author"
                />
                <FormControlLabel
                  value={'isbn'}
                  control={<Radio color="primary" />}
                  label="ISBN"
                />
              </RadioGroup>
            </FormControl>
            <Button color="primary"
              variant="contained"
              component={Link}
              to="/advanced-search">
              Try Advanced Search
          </Button>
          </div>
        </Card>
      </form>
    </div>
  )
};

export default Home;

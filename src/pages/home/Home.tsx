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
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import BookRow from './book-row/BookRow';
import { v4 as uuidv4 } from 'uuid';

let books: Map<string, Book> = new Map<string, Book>([]);

export const Home = () => {

  const [searchType, setSearchType] = useState<string>('title');
  const [tableClicked, setTableClicked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };
  
  const searchByTitle = async (searchString: string) => {
    var filters: Filters = {
      title: searchString
    }

    const getAllBooksByTitle = () => (new BookController()).getBooksByTitle(searchString);
    const advancedSearch = () => (new BookController()).advancedSearch(filters);

    books = await advancedSearch();
  };


  const searchByAuthor = async (searchString: string) => {
    var filters: Filters = {
      author: searchString
    }

    const getAllBooksByAuthor = () => (new BookController()).getBooksByAuthor(searchString);
    const advancedSearch = () => (new BookController()).advancedSearch(filters);
    
    books = await advancedSearch();
  };

  const searchByISBN = async (searchString: string) => {
    var filters: Filters = {
      ISBN: searchString as unknown as number
    }

    const getAllBooksByISBN = () => (new BookController()).getBooksByISBN(searchString as unknown as number);
    const advancedSearch = () => (new BookController()).advancedSearch(filters);
    
    books = await advancedSearch();
  };

  const executeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { searchString, searchType } = parseSearch(form);

    setTableClicked(false); 

    switch (searchType) {

      case "title":
        await searchByTitle(searchString);
        break;
      case "author":
        await searchByAuthor(searchString);
        break;
      case "isbn":
        await searchByISBN(searchString);
        break;
    }

    console.log("Here are the books");
    console.log(books);
    setTableClicked(true);
  };

  const parseSearch = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return {
      searchString: data.get('search') as string,
      searchType: searchType
    };
  };

  const booksOnly = Array.from(books.values());

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
      {!tableClicked ? null :
        <Card className="summary">
          <Table size="small" className="table">
            <TableHead>
              <TableRow className="table__tr">
                <TableCell width="50%">
                  <div>Book Image</div>
                </TableCell>
                <TableCell>
                  <div>Book Description</div>
                </TableCell>
              </TableRow>
            </TableHead>
            {books.size === 0 ? <div>There are no books!</div> :
              <TableBody>
                {booksOnly.map((book) => (
                  <BookRow key={uuidv4()} props={book} />
                ))}
              </TableBody>
            }
          </Table>
        </Card>
      }
    </div >
  )
};

export default Home;

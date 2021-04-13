import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Location } from 'history';
import {
  Button,
  InputBase,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Card, Progress, ReturnButton } from '../../components';
import './Home.scss';
import './Home.css';
import { Search } from '@material-ui/icons';
import bookLogo from '../../assets/logo.png';
import BookController from '../../firebase/book.controller';
import { Book } from '../../interfaces/book';
import { Filters } from '../../interfaces/filters';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import BookRow from './book-row/BookRow';

let books: Map<string, Book> = new Map<string, Book>([]);

export const Home = () => {

  const [searchType, setSearchType] = useState<string>('title');
  const [tableClicked, setTableClicked] = useState<boolean>(false);
  const [showScroll, setShowScroll] = useState(false);
  const bookController = new BookController();
  //const location = useLocation<Location>();
  //const data = location.state;

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
    const getAllBooksByISBN = () => bookController.getBooksByISBN(searchString);
    books = await getAllBooksByISBN();
  };

  const advancedSearch = async (filters: Filters) => {
    const advancedSearch = () => bookController.advancedSearch(filters);
    books = await advancedSearch();
  };

  const addBook = async (book: Book) => {
    const addBook = () => bookController.addBook(book);
    addedBookId = await addBook();
  };

  const executeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { searchString, searchType } = parseSearch(form);

    setTableClicked(false);

    switch (searchType) {
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

    //console.log(data);
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

  //const booksOnly = Array.from(books.values());
  const keysOnly = Array.from(books.keys());

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return false ? (
    <Progress />
  ) : (
    <div className="Home">
      <FaArrowCircleUp
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
      />
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
        <div>
          <h4 className="title">{books.size === 0 || books.size === 1 ? <div>{books.size} book found !</div> : <div>{books.size} books found !</div>}</h4>
          {books.size === 0 ? null :
            <Card className="summary">
              <Table size="small" className="table">
                <TableHead>
                  <TableRow className="table__tr">
                    <TableCell>
                      Book 
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {keysOnly.map((id) => (
                    <BookRow key={id} props={id} book={books.get(id)} />
                  ))}
                </TableBody>
              </Table>
            </Card>
          }
        </div>
      }
    </div >
  )
};

export default Home;

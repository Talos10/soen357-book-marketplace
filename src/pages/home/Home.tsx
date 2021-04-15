import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
import { Search } from '@material-ui/icons';
import bookLogo from '../../assets/logo.png';
import BookController from '../../firebase/book.controller';
import { Book } from '../../interfaces/book';
import { Filters } from '../../interfaces/filters';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import BookRow from './book-row/BookRow';

let books: Map<string, Book> | undefined = undefined;

export const Home = () => {

  const [searchType, setSearchType] = useState<string>('title');
  const [tableClicked, setTableClicked] = useState<boolean>(false);
  const [showScroll, setShowScroll] = useState(false);
  const bookController = new BookController();
  let location = useLocation<Map<string, Book> | undefined>();
  const [advancedSearchBooks, setAdvancedSearchBooks] = useState<Map<string, Book>>();
  console.log(books);

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

  const advancedKeysOnly = advancedSearchBooks !== undefined ? Array.from(advancedSearchBooks.keys()) : null;
  const keysOnly = books === undefined ? null : Array.from(books?.keys());

  useEffect(() => {
    console.log("books is: ");
    console.log(books);
    books?.size === 0 ? setAdvancedSearchBooks(undefined) : setAdvancedSearchBooks(location.state);
    console.log("Advanced books is: ");
    console.log(advancedSearchBooks);

    window.history.replaceState({}, document.title);
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
              endAdornment={<Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Search
            </Button>}
            />
            <Button
              className="advanced__search__button"
              color="primary"
              size="small"
              component={Link}
              onClick={() => books = undefined}
              to="/advanced-search">
              Advanced Search
            </Button>
          </div>
          <div className="search__buttons">
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
          </div>
        </Card>
      </form>
      {advancedSearchBooks === undefined && books == undefined ? null :
        <div>
          {<h4 className="title">
            {books !== undefined ?
              books?.size === 0 || books?.size === 1 ? <div>{books?.size} Book Found!</div> : <div>{books?.size} Books Found!</div> :
              advancedSearchBooks?.size === 0 || advancedSearchBooks?.size === 1 ? <div>{advancedSearchBooks?.size} Book Found!</div> : <div>{advancedSearchBooks?.size} Books Found!</div>
            }
          </h4>}
          {books?.size !== 0 ? <Card className="summary">
            <Table size="small" className="table">
              <TableHead>
                <TableRow className="table__tr">
                  <TableCell>
                    <div></div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  books !== undefined ?
                    keysOnly?.map((id) => (
                      <BookRow key={id} props={id} book={books?.get(id)} />
                    )) : advancedKeysOnly?.map((id) => (
                      <BookRow key={id} props={id} book={advancedSearchBooks?.get(id)} />
                    ))
                }
              </TableBody>
            </Table>
          </Card> : null}
        </div>
      }
    </div >
  )
};

export default Home;

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
import './Search.scss';
import { Search } from '@material-ui/icons';
import bookLogo from '../../assets/logo.png';
import BookController from '../../firebase/book.controller';
import { Book } from '../../interfaces/book';
import { Filters } from '../../interfaces/filters';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import BookRow from './book-row/BookRow';

let books: Map<string, Book> | undefined = undefined;

export const SearchPage = () => {

  const [searchType, setSearchType] = useState<string>('title');
  const [tableClicked, setTableClicked] = useState<boolean>(false);
  const [showScroll, setShowScroll] = useState(false);
  const bookController = new BookController();
  let location = useLocation<Map<string, Book> | undefined>();
  const [advancedSearchBooks, setAdvancedSearchBooks] = useState<Map<string, Book>>();

  //change the filter type when the user clicks on the different radio buttons
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  //initializes the books variable with a map of books filtered by the title
  const searchByTitle = async (searchString: string) => {
    const getAllBooksByTitle = () => bookController.getBooksByTitle(searchString);
    books = await getAllBooksByTitle();
  };

  //initializes the books variable with a map of books filtered by the author
  const searchByAuthor = async (searchString: string) => {
    const getAllBooksByAuthor = () => bookController.getBooksByAuthor(searchString);
    books = await getAllBooksByAuthor();
  };

  //initializes the books variable with a map of books filtered by the ISBN
  const searchByISBN = async (searchString: string) => {
    const getAllBooksByISBN = () => bookController.getBooksByISBN(searchString);
    books = await getAllBooksByISBN();
  };

  //is executed when the user clicks the search button
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
    setTableClicked(true);
  };

  //parse the form
  const parseSearch = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return {
      searchString: data.get('search') as string,
      searchType: searchType
    };
  };

  const advancedKeysOnly = advancedSearchBooks !== undefined ? Array.from(advancedSearchBooks.keys()) : null;
  const keysOnly = books === undefined ? null : Array.from(books?.keys());

  //loads first
  useEffect(() => {
    books?.size === 0 ? setAdvancedSearchBooks(undefined) : setAdvancedSearchBooks(location.state);

    window.history.replaceState({}, document.title);
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  //methods used to bring the user back to the top if the use is at the bottom of the listed books 
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

  //rendered HTML
  return false ? (
    <Progress />
  ) : (
    <div className="SearchPage">
      <FaArrowCircleUp
        className="scrollTop"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
      />
      <div className="search_page__top">
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
              books?.size === 1 ? <div>{books?.size} Book Found!</div> : <div>{books?.size} Books Found!</div> :
              advancedSearchBooks?.size === 1 ? <div>{advancedSearchBooks?.size} Book Found!</div> : <div>{advancedSearchBooks?.size} Books Found!</div>
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

export default SearchPage;

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Filters } from '../../interfaces/filters';
import BookController from '../../firebase/book.controller';
import './AdvancedSearch.scss';
import { Book } from '../../interfaces/book';
import { useHistory } from 'react-router-dom';

let results: Map<string, Book> = new Map<string, Book>([]);

export default function AdvancedSearch() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(0);
  const [fromPrice, setFromPrice] = useState(-1);
  const [toPrice, setToPrice] = useState(-1);
  const [overallCondition, setOverallCondition] = useState({ asNew: false,
    veryGood: false,
    good: false,
    fair: false,
    poor: false});
  const [annotatedPages, setAnnotatedPages] = useState({value: 2, text: "EITHER"});
  const [foldedPageCorners, setFoldedPageCorners] = useState({value: 2, text: "EITHER"});
  const [schoolName, setSchoolName] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);
  const history = useHistory();


  const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverallCondition({ ...overallCondition, [event.target.name]: event.target.checked });
  };

  const handleAnnotationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setAnnotatedPages({ value: newValue, text: selection.innerText });
  };

  const handleFoldedChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setFoldedPageCorners({ value: newValue, text: selection.innerText });
  };

  const determineConditionFilter = () => {
    const conditions = [];
    if (overallCondition.asNew) {
      conditions.push("AS NEW");
    }
    if (overallCondition.veryGood) {
      conditions.push("VERY GOOD");
    }
    if (overallCondition.good) {
      conditions.push("GOOD");
    }
    if (overallCondition.fair) {
      conditions.push("FAIR");
    }
    if (overallCondition.poor) {
      conditions.push("POOR");
    }
    if (conditions.length === 0) {
      return undefined;
    }
    else {
      return conditions;
    }
  }

  const handleSearch = async () => {


    const filters : Filters = {
      title: bookTitle !== "" ? bookTitle : undefined,
      author: author !== "" ? author : undefined,
      ISBN: isbn !== "" ? isbn : undefined,
      year: year !== 0 ? year : undefined,
      prices: fromPrice !== -1 && toPrice !== -1 ? [fromPrice, toPrice] : fromPrice !== -1 ? [fromPrice] : toPrice !== -1 ? [toPrice] : undefined,
      isAbove: fromPrice !== -1 && toPrice === -1 ? true : false,
      conditions: determineConditionFilter(),
      pagesAnnotated: annotatedPages.text === 'EITHER' ? undefined : annotatedPages.text === 'YES' ? true : false,
      pageCornersFolded: foldedPageCorners.text === 'EITHER' ? undefined : foldedPageCorners.text === 'YES' ? true : false,
      university: schoolName !== "" ? schoolName : undefined,
      courseSubject: courseSubject !== "" ? courseSubject : undefined,
      courseNumber: courseNumber !== 0 ? courseNumber : undefined
      //hasPictures: false,
    }
    console.log("filters: " + filters);
    const advancedBooks = await new BookController().advancedSearch(filters);
    console.log("Advanced Search:", advancedBooks);
    history.push({
      pathname:"/home",
      state: advancedBooks
    })
  }

  return (
    <div className='AdvancedSearch'>
      <Card className="book__info__form">
        <h4>Book Information</h4>
        <label className='text__input' htmlFor="book-title">Book Title</label>
        <TextField
          type="string"
          id="book-title"
          name="book-title"
          variant="outlined"
          required
          fullWidth
          value={bookTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBookTitle(event.target.value);
          }}
        />

        <label className='text__input' htmlFor="book-author">Author</label>
        <TextField
          type="string"
          id="book-author"
          name="book-author"
          variant="outlined"
          required
          fullWidth
          value={author}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAuthor(event.target.value);
          }}
        />

        <label className='text__input' htmlFor="book-isbn">ISBN</label>
        <TextField
          type="string"
          id="isbn"
          name="isbn"
          variant="outlined"
          required
          fullWidth
          value={isbn}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIsbn(event.target.value);
          }}
        />

        <label className='text__input' htmlFor="event-time">Year</label>
        <TextField
          type='number'
          required
          variant="outlined"
          id="validation-outlined-input"
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setYear(Number(e.target.value))
          }}
        />
      </Card>
      <Card className='form__container'>
        <h4>Price</h4>
        <div className="price__form">
          <p className="from__to">From</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormControl>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFromPrice(Number(event.target.value));
              }}
            />
          </FormControl>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p className="from__to">To</p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormControl>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setToPrice(Number(event.target.value));
              }}
            />
          </FormControl>
        </div>
      </Card>
      <Card className='form__container'>
        <h4>Book Condition</h4>
        <div className='book__condition__form'>
          <label htmlFor="event-title">Overall Condition:</label>
          <FormControl required component="fieldset" className='overall__condition'>
            <FormLabel component="legend">You can pick more than one</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" checked={overallCondition.asNew} onChange={handleConditionChange} name="asNew" />}
                label="As New"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={overallCondition.veryGood} onChange={handleConditionChange} name="veryGood" />}
                label="Very Good"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={overallCondition.good} onChange={handleConditionChange} name="good" />}
                label="Good"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={overallCondition.fair} onChange={handleConditionChange} name="fair" />}
                label="Fair"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={overallCondition.poor} onChange={handleConditionChange} name="poor" />}
                label="Poor"
              />
            </FormGroup>
          </FormControl>
        </div>
        <br />
        <br />
        <div className='book__condition__form'>
          <label htmlFor="event-title">Annotated Pages:</label>
          <Paper square className='annotated__pages'>
            <Tabs
              value={annotatedPages.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleAnnotationChange}
            >
              <Tab label="Yes" value={0} />
              <Tab label="No" value={1} />
              <Tab label="Either" value={2} />
            </Tabs>
          </Paper>
        </div>
        <br />
        <br />
        <div className='book__condition__form'>
          <label htmlFor="event-title">Folded Page Corners:</label>
          <Paper square className='folded__page__corners'>
            <Tabs
              value={foldedPageCorners.value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleFoldedChange}
            >
              <Tab label="Yes" value={0} />
              <Tab label="No" value={1} />
              <Tab label="Either" value={2} />
            </Tabs>
          </Paper>
        </div>
      </Card>
      <Card className='form__container'>
        <h4>School</h4>
        <label htmlFor="school-name">School Name</label>
        <FormControl variant="outlined">
          <Select
            native
            value={schoolName}
            onChange={(event) => {
              setSchoolName(event.target.value as string);
            }
            }
          >
            <option aria-label="None" value="" />
            <option value={"Concordia University"}>Concordia University</option>
            <option value={"McGill University"}>McGill University</option>
            <option value={"UdeM"}>Université de Montréal</option>
            <option value={"Polytechnique"}>Polytechnique Montréal</option>
            <option value={"ÉTS"}>ÉTS</option>
            <option value={"UQAM"}>Université du Québec à Montréal</option>
          </Select>
        </FormControl>
        <label className='text__input' htmlFor="school-course-subject">Course Subject  <Tooltip title="For example, if you are taking course COMP352, the course subject is COMP" placement="right-start"><InfoIcon /></Tooltip></label>
        <TextField
          type="string"
          id="school-course-subject"
          name="school-course-subject"
          variant="outlined"
          required
          fullWidth
          value={courseSubject}
          onChange={(event) => {
            setCourseSubject(event.target.value as string);
          }
          }
        />
        <label className='text__input' htmlFor="school-course-number">Course Number  <Tooltip title="For example, if you are taking course COMP352, the course number is 352" placement="right-start"><InfoIcon /></Tooltip></label>
        <TextField
          type="number"
          id="school-course-number"
          name="school-course-number"
          variant="outlined"
          required
          fullWidth
          onChange={(event) => {
            setCourseNumber(Number(event.target.value))
          }}
        />
      </Card>
      <Button
        className='search__button'
        variant="contained"
        color="primary"
        size="large"
        onClick = {() => handleSearch()}
      >
        Search
      </Button>
      <Button
        className='search__button'
        variant="outlined"
        color="primary"
        size="large"
        component={Link}
        to="/home"
      >
        Discard
      </Button>
    </div>
  );
}

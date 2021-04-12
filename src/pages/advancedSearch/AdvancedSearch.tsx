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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Filters } from '../../interfaces/filters';
import './AdvancedSearch.scss';

export default function AdvancedSearch() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [overallCondition, setOverallCondition] = useState({value: 0, text: "AS NEW"});
  const [annotatedPages, setAnnotatedPages] = useState({value: 0, text: "YES"});
  const [foldedPageCorners, setFoldedPageCorners] = useState({value: 1, text: "NO"});
  const [schoolName, setSchoolName] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);

  const handleConditionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setOverallCondition({value: newValue, text: selection.innerText});
  };

  const handleAnnotationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setAnnotatedPages({value: newValue, text: selection.innerText});
  };

  const handleFoldedChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setFoldedPageCorners({value: newValue, text: selection.innerText});
  };

  const handleSearch = () => {
    const filters : Filters = {
      pageCornersFolded: foldedPageCorners.text === 'YES' ? true : false,
      prices: [fromPrice, toPrice],
      isAbove: true,
      title: bookTitle,
      author: author,
      conditions: [overallCondition.text],
      university: schoolName,
      hasPictures: false,
      courseSubject: courseSubject,
      courseNumber: courseNumber,
      pagesAnnotated: annotatedPages.text === 'YES' ? true : false
    }
    console.log(filters);
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
      value={year}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setYear(Number(e.target.value))
      }}
    />
    {(year < 0 || year > new Date().getFullYear()) && <p>test</p>}
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
      <Paper square className='overall__condition'>
      <Tabs
        value={overallCondition.value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleConditionChange}
      >
        <Tab label="As New" value={0} />
        <Tab label="Very Good" value={1} />
        <Tab label="Good" value={2} />
        <Tab label="Fair" value={3} />
        <Tab label="Poor" value={4} />
      </Tabs>
    </Paper>
    </div>
    <br/>
    <br/>
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
      </Tabs>
    </Paper>
    </div>
    <br/>
    <br/>
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
      </Tabs>
    </Paper>
    </div>
  </Card>
  <Card className='form__container'>
      <h4>School</h4>
    <label htmlFor="school-name">University Name</label>
    <FormControl variant="outlined">
        <Select
        native
          value={schoolName}
          onChange={(event) => {
            setSchoolName(event.target.value as string);}
          }
        >
          <option aria-label="None" value="" />
          <option value={"Concordia"}>Concordia University</option>
          <option value={"McGill"}>McGill University</option>
          <option value={"UdeM"}>Université de Montréal</option>
          <option value={"Polytechnique"}>Polytechnique Montréal</option>
          <option value={"ÉTS"}>ÉTS</option>
          <option value={"UQAM"}>Université du Québec à Montréal</option>
        </Select>
    </FormControl>
    <label className='text__input' htmlFor="school-course-subject">Course Subject  <Tooltip title="For example, if you are taking course COMP352, the course subject is COMP" placement="right-start"><InfoIcon/></Tooltip></label>
    <TextField
      type="string"
      id="school-course-subject"
      name="school-course-subject"
      variant="outlined"
      required
      fullWidth
      onChange={(event) => {
        setCourseSubject(event.target.value as string);}
      }
    />
    <label className='text__input' htmlFor="school-course-number">Course Number  <Tooltip title="For example, if you are taking course COMP352, the course number is 352" placement="right-start"><InfoIcon/></Tooltip></label>
    <TextField
      type="string"
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
        onClick={() => handleSearch()}
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

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  InputBase,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputLabel,
  InputAdornment,
  Tab,
  Paper,
  Tabs,
  Select,
  Tooltip,
  Input
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Card, Progress, ReturnButton } from '../../components';
import './Sell.scss';
import { Search } from '@material-ui/icons';
import bookLogo from '../../assets/logo.png';
import BookController from '../../firebase/book.controller';
import { Book } from '../../interfaces/book';
import { Filters } from '../../interfaces/filters';
import ImageUploading, { ImageListType } from "react-images-uploading";


export const Sell = () => {

  var bookToAdd: Book;

  const maxImages = 4;

  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(-1);
  const [overallCondition, setOverallCondition] = useState({ value: 0, text: "AS NEW" });
  const [annotatedPages, setAnnotatedPages] = useState({ value: 1, text: "NO" });
  const [foldedPageCorners, setFoldedPageCorners] = useState({ value: 1, text: "NO" });
  const [images, setImages] = React.useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleConditionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setOverallCondition({ value: newValue, text: selection.innerText });
  };

  const handleAnnotationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setAnnotatedPages({ value: newValue, text: selection.innerText });
  };

  const handleFoldedChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setFoldedPageCorners({ value: newValue, text: selection.innerText });
  };

  const onImageChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return false ? (
    <Progress />
  ) : (
    <div className='Sell'>

      <div>
        <p><h3>Post a Book for Sale</h3></p>
      </div>

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
          <FormControl>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(Number(event.target.value));
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
            </Tabs>
          </Paper>
        </div>
      </Card>
      <Card>
        <h4>Book Images</h4>
        <ImageUploading
          multiple
          value={images}
          onChange={onImageChange}
          maxNumber={maxImages}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
            </button>
            &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
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
            <option value={"Concordia"}>Concordia University</option>
            <option value={"McGill"}>McGill University</option>
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

      <Card className="contact__info__form">
        <h4>Contact Information</h4>
        <label className='text__input' htmlFor="email">Email</label>
        <TextField
          type="email"
          id="email"
          name="email"
          variant="outlined"
          required
          fullWidth
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />

        <label className='text__input' htmlFor="phone-number">Phone Number</label>
        <TextField
          type="tel"
          id="phone-number"
          name="phone-number"
          variant="outlined"
          required
          value={phone}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(event.target.value);
          }}
        />
      </Card>
      <Button
        className='post__button'
        variant="contained"
        color="primary"
        size="large"
        type="submit"
      >
        Post
    </Button>
      <Button
        className='post__button'
        variant="outlined"
        color="primary"
        size="large"
        component={Link}
        to="/home"
      >
        Discard
    </Button>
    </div>
  )
};

export default Sell;

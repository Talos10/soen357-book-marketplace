import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControl,
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
import { Card, Progress } from '../../components';
import './Sell.scss';
import bookLogo from '../../assets/logo.png';
import BookController from '../../firebase/book.controller';
import { Book } from '../../interfaces/book';
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { useHistory } from 'react-router-dom';


export const Sell = () => {

  const maxImages = 4;
  const history = useHistory();
  const bookController = new BookController();
  
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(-1);
  const [overallCondition, setOverallCondition] = useState({ value: 0, text: "AS NEW" });
  const [annotatedPages, setAnnotatedPages] = useState({ value: false, text: "NO" });
  const [foldedPageCorners, setFoldedPageCorners] = useState({ value: false, text: "NO" });
  const [images, setImages] = useState<ImageType[]>([]);
  const [schoolName, setSchoolName] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleConditionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setOverallCondition({ value: newValue, text: selection.innerText });
  };

  const handleAnnotationChange = (event: React.ChangeEvent<{}>, newValue: boolean) => {
    const selection = event.target as HTMLElement;
    setAnnotatedPages({ value: newValue, text: selection.innerText });
  };

  const handleFoldedChange = (event: React.ChangeEvent<{}>, newValue: boolean) => {
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

  const postBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const postedBook: Book = await parseBook(form) as unknown as Book;

    console.log("Here's the postedBook");
    console.log(postedBook);

    var addedBookId = await bookController.addBook(postedBook);
    console.log("Posted book ID: ",addedBookId);

    history.push("/home");

  };

  const parseBook = async (form: HTMLFormElement) => {
    const data = new FormData(form);

    var bookToPost = undefined;

    const promises = [];
    for(var i = 0; i < images.length; i++){//Instead of e.target.files, you could also have your files variable
        promises.push(await bookController.uploadFile(images[i].file as File))
    }
    
    //The Promise.all() will stop the execution, until all of the promises are resolved.
    await Promise.all(promises).then((fileURLS)=>{
        //Once all the promises are resolved, you will get the urls in a array.
        console.log("Here are the firebase urls \n",fileURLS);

        bookToPost = {
          title: bookTitle as string,
          titleArray: [],
          author: author as string,
          authorArray: [],
          ISBN: isbn as string,
          year: year as number,
          price: price as number,
          condition: overallCondition.text as "AS NEW" | "VERY GOOD" | 'GOOD' | 'FAIR' | 'POOR',
          pagesAnnotated: annotatedPages.value as boolean,
          pageCornersFolded: foldedPageCorners.value as boolean,
          images: fileURLS as string [],
          university: schoolName as string,
          courseSubject: courseSubject as string,
          courseNumber: courseNumber as number,
          email: email as string,
          phone:phone as string
        } as Book;
    });

    return bookToPost;

  };

  return false ? (
    <Progress />
  ) : (
    <div className='Sell'>
      <form onSubmit = {postBook}>
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

          <label className='text__input' htmlFor="year-html">Year</label>
          <TextField
            type='number'
            required
            variant="outlined"
            id="year"
            name="year"
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
                id="price"
                name="price"
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
            <label htmlFor="overall-condition">Overall Condition:</label>
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
                <Tab label="Yes" value={true} />
                <Tab label="No" value={false} />
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
                <Tab label="Yes" value={true} />
                <Tab label="No" value={false} />
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
      </form>
    </div>
  )
};

export default Sell;

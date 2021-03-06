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

  const maxImages = 4; //max number of images a user can upload
  const history = useHistory();
  const bookController = new BookController();
  
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(0);
  const [price, setPrice] = useState(-1);
  const [overallCondition, setOverallCondition] = useState({ value: 0, text: "AS NEW" });
  const [annotatedPages, setAnnotatedPages] = useState({ value: 0, text: "NO" });
  const [foldedPageCorners, setFoldedPageCorners] = useState({ value: 0, text: "NO" });
  const [images, setImages] = useState<ImageType[]>([]);
  const [schoolName, setSchoolName] = useState("");
  const [courseSubject, setCourseSubject] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);
  const [description, setSetDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //changes the condition variable dynamically when the user selects another option
  const handleConditionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setOverallCondition({ value: newValue, text: selection.innerText });
  };

  //changes the annotated pages variable dynamically when the user selects another option
  const handleAnnotationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setAnnotatedPages({ value: newValue, text: selection.innerText });
  };

  //changes the folded corners variable dynamically when the user selects another option
  const handleFoldedChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    setFoldedPageCorners({ value: newValue, text: selection.innerText });
  };

  //when uploading an image, add it to the list of images
  const onImageChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList as never[]);
  };

  //triggered when the user presses the Post button
  const postBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const postedBook: Book = await parseBook(form) as unknown as Book;

    var addedBookId = await bookController.addBook(postedBook);

    history.push("/search");

  };

  //parse the form
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

        //newly created book object that will be sent to the backend
        bookToPost = {
          title: bookTitle as string,
          titleArray: [],
          author: author as string,
          authorArray: [],
          ISBN: isbn as string,
          year: year as number,
          price: price as number,
          condition: overallCondition.text as "AS NEW" | "VERY GOOD" | 'GOOD' | 'FAIR' | 'POOR',
          pagesAnnotated: annotatedPages.value == 1 ? true : false as boolean,
          pageCornersFolded: foldedPageCorners.value == 1 ? true : false as boolean,
          images: fileURLS as string [],
          university: schoolName as string,
          courseSubject: courseSubject as string,
          courseNumber: courseNumber as number,
          description: description as string,
          email: email as string,
          phone:phone as string
        } as Book;
    });

    return bookToPost;

  };

  //rendered HTML
  return false ? (
    <Progress />
  ) : (
    <div className='Sell'>
      <form onSubmit = {postBook}>
        <div>
          <h3>Post a Book for Sale</h3>
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
                <Tab label="Yes" value={1} />
                <Tab label="No" value={0} />
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
                <Tab label="Yes" value={1} />
                <Tab label="No" value={0} />
              </Tabs>
            </Paper>
          </div>
        </Card>
        <Card>
          <h4>Upload Images</h4>
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
                <Button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  Click or Drop Images Here
            </Button>
            &nbsp;
                <Button
                onClick={onImageRemoveAll}
                variant="outlined"
                color="secondary"
                size="large"
                >Remove all images</Button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.dataURL} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={() => onImageUpdate(index)}>Update</Button>
                      <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      onClick={() => onImageRemove(index)}>Remove</Button>
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
              <option value={"UdeM"}>Universit?? de Montr??al</option>
              <option value={"Polytechnique"}>Polytechnique Montr??al</option>
              <option value={"??TS"}>??TS</option>
              <option value={"UQAM"}>Universit?? du Qu??bec ?? Montr??al</option>
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

        <Card className='form__container'>
          <h4>Additional Information <Tooltip title="If you want to give additional information, write it here. Otherwise, leave it blank." placement="right-start"><InfoIcon /></Tooltip></h4>
          <TextField
            type="string"
            id="description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            value={description}
            onChange={(event) => {
              setSetDescription(event.target.value as string);
            }
            }
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
          to="/search"
        >
          Discard
        </Button>
      </form>
    </div>
  )
};

export default Sell;

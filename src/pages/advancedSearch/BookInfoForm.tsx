import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { useState } from 'react';

export default function BookInfoForm() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  return (
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
  </Card>
  );
}
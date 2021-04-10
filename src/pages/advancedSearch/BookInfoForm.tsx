import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

export default function BookInfoForm() {

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
    />

    <label className='text__input' htmlFor="book-author">Author</label>
    <TextField
      type="string"
      id="book-author"
      name="book-author"
      variant="outlined"
      required
      fullWidth
    />

    <label className='text__input' htmlFor="book-isbn">ISBN</label>
    <TextField
      type="string"
      id="isbn"
      name="isbn"
      variant="outlined"
      required
      fullWidth
    />

    <label className='text__input' htmlFor="event-time">Year</label>
    <TextField
      type='number'
      required
      defaultValue={new Date().getFullYear()}
      variant="outlined"
      id="validation-outlined-input"
      fullWidth
    />
  </Card>
  );
}
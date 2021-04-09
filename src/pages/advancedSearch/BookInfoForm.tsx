import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

export default function BookInfoForm() {
  return (
    <Card style={{padding: 25}}>
      <h4>Book Information</h4>
    <label htmlFor="event-title">Title</label>
    <TextField
      type="string"
      id="event-title"
      name="event-title"
      variant="outlined"
      required
      fullWidth
    />

    <label htmlFor="event-date">Date</label>
    <TextField
      type="date"
      id="event-date"
      name="event-date"
      variant="outlined"
      required
      fullWidth
    />

    <label htmlFor="event-time">Time</label>
    <TextField
      type="time"
      id="event-time"
      name="event-time"
      variant="outlined"
      required
      fullWidth
    />
  </Card>
  );
}
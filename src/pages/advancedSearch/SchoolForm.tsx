import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

export default function SchoolForm() {
  return (
    <Card style={{padding: 25, marginTop: 30}}>
      <h4>School</h4>
    <label htmlFor="event-title">University Name</label>
    <TextField
      type="string"
      id="event-title"
      name="event-title"
      variant="outlined"
      required
      fullWidth
    />
    <label htmlFor="event-title">Course Identifier</label>
    <TextField
      type="string"
      id="event-title"
      name="event-title"
      variant="outlined"
      required
      fullWidth
    />
  </Card>
  );
}
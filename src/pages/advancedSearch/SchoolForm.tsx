import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SchoolForm() {
  return (
    <Card className='form__container'>
      <h4>School</h4>
    <label htmlFor="school-name">University Name</label>
    <FormControl variant="outlined">
        <Select
        native
          //value={state.age}
          //onChange={handleChange}
      
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
    />
    <label className='text__input' htmlFor="school-course-number">Course Number  <Tooltip title="For example, if you are taking course COMP352, the course number is 352" placement="right-start"><InfoIcon/></Tooltip></label>
    <TextField
      type="string"
      id="school-course-number"
      name="school-course-number"
      variant="outlined"
      required
      fullWidth
    />
  </Card>
  );
}
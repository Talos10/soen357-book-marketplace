import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PriceForm() {
  return (
    <Card style={{padding: 25, marginTop: 30}}>
     <h4>Price</h4>
     <div style={{display: 'flex', }}>
     <p style={{marginTop: 20}}>From</p>
     &nbsp;&nbsp;&nbsp;&nbsp;
     <FormControl style={{marginLeft: 10}}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
     </FormControl>
     &nbsp;&nbsp;&nbsp;&nbsp;
     <p style={{marginTop: 20}}>To</p>
     &nbsp;&nbsp;&nbsp;&nbsp;
     <FormControl style={{marginLeft: 10}}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
     </FormControl>
     </div>
  </Card>
  );
}
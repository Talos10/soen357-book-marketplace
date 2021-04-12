import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

export default function PriceForm() {
  return (
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
          />
     </FormControl>
     </div>
  </Card>
  );
}
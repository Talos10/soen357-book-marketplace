import BookCondition from './BookCondition';
import BookInfoForm from './BookInfoForm';
import PriceForm from './PriceForm';
import SchoolForm from './SchoolForm';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './AdvancedSearch.scss';

export default function AdvancedSearch() {

  return (
    <div className='AdvancedSearch'>
      <BookInfoForm/>
      <PriceForm/>
      <BookCondition/>
      <SchoolForm/>
      <Button
        className='search__button'
        variant="contained"
        color="primary"
        size="large"
      >
        Search
      </Button>
      <Button
        className='search__button'
        variant="outlined"
        color="primary"
        size="large"
        component={Link}
        to="/home"
      >
        Discard
      </Button>
    </div>
  );
}

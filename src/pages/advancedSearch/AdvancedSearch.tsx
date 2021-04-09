import BookCondition from './BookCondition';
import BookInfoForm from './BookInfoForm';
import PriceForm from './PriceForm';
import SchoolForm from './SchoolForm';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default function AdvancedSearch() {

  return (
    <div>
      <BookInfoForm/>
      <PriceForm/>
      <BookCondition/>
      <SchoolForm/>
      <Button
        variant="contained"
        color="primary"
      >
        Send
      </Button>
    </div>
  );
}

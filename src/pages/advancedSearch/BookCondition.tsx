import Card from '@material-ui/core/Card';
import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function BookCondition() {
  const [conditionValue, setConditionValue] = useState(0);
  const [annotatedValue, setAnnotatedValue] = useState(0);
  const [foldedPageValue, setFoldedPageValue] = useState(1);

  const handleConditionChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    console.log(selection.innerText);
    setConditionValue(newValue);
  };

  const handleAnnotationChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    console.log(selection.innerText);
    setAnnotatedValue(newValue);
  };

  const handleFoldedChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const selection = event.target as HTMLElement;
    console.log(selection.innerText);
    setFoldedPageValue(newValue);
  };

  return (
    <Card className='form__container'>
    <h4>Book Condition</h4>
    <div className='book__condition__form'>
    <label htmlFor="event-title">Overall Condition:</label>
      <Paper square className='overall__condition'>
      <Tabs
        value={conditionValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleConditionChange}
      >
        <Tab label="As New" />
        <Tab label="Very Good" />
        <Tab label="Good" />
        <Tab label="Fair" />
        <Tab label="Poor" />
      </Tabs>
    </Paper>
    </div>
    <br/>
    <br/>
    <div className='book__condition__form'>
    <label htmlFor="event-title">Annotated Pages:</label>
      <Paper square className='annotated__pages'>
      <Tabs
        value={annotatedValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleAnnotationChange}
      >
        <Tab label="Yes" />
        <Tab label="No" />
      </Tabs>
    </Paper>
    </div>
    <br/>
    <br/>
    <div className='book__condition__form'>
    <label htmlFor="event-title">Folded Page Corners:</label>
      <Paper square className='folded__page__corners'>
      <Tabs
        value={foldedPageValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleFoldedChange}
      >
        <Tab label="Yes" />
        <Tab label="No" />
      </Tabs>
    </Paper>
    </div>
  </Card>
  );
}

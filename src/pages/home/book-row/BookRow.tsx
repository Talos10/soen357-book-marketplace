import './BookRow.css';
import { TableCell, TableRow } from '@material-ui/core';
import { Book } from '../../../interfaces/book';
import { v4 as uuidv4 } from 'uuid';
import AwesomeSlider from 'react-awesome-slider';
//import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

interface Props {
    props: Book;
}

export default function BookTable({ props }: Props) {

    const slider = (
        <AwesomeSlider animation="foldOutAnimation">
            {props.images.map(image => (
                <div key={uuidv4()} data-src={image} />
            ))}
        </AwesomeSlider>
    );

    return (
        <TableRow className="table-row">
            <TableCell>{slider}</TableCell>
            <TableCell>
                <div><b>ISBN: </b>{props.ISBN}</div>
                <div><b>Author: </b>{props.author}</div>
                <div><b>Title: </b>{props.title}</div>
                <div><b>University: </b>{props.university}</div>
                <div><b>Year: </b>{props.year}</div>
                <div><b>Price: </b>{props.price}</div>
                <div><b>Book condition: </b>{props.condition}</div>
                <div><b>Course: </b>{props.courseSubject + " " + props.courseNumber}</div>
                <div>{props.pageCornersFolded ? <b>Pages are folded</b> : <b>Pages are not folded</b>}</div>
                <div>{props.pagesAnnotated ? <b>Pages are annotated</b> : <b>Pages are not annotated</b>}</div>
            </TableCell>
        </TableRow>
    );
}
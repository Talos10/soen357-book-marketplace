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
                <div>ISBN: {props.ISBN}</div>
                <div>Author: {props.author}</div>
                <div>Title: {props.title}</div>
                <div>University: {props.university}</div>
                <div>Year: {props.year}</div>
                <div>Price: {props.price}</div>
                <div>Book condition: {props.condition}</div>
                <div>Course: {props.courseSubject + " " + props.courseNumber}</div>
                <div>{props.pageCornersFolded ? "Pages are folded" : "Pages are not folded"}</div>
                <div>{props.pagesAnnotated ? "Pages are annotated" : "Pages are not annotated"}</div>
            </TableCell>
        </TableRow>
    );
}
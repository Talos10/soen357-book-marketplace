import './BookRow.scss';
import { TableCell, TableRow } from '@material-ui/core';
import { Book } from '../../../interfaces/book';

interface Props {
    props: Book;
}

export default function BookTable({ props }: Props) {

    return (
        <TableRow className="table-row">
            <TableCell><img src={props.images[0]} alt="photo" width="50%" /></TableCell>
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
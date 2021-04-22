import './BookRow.css';
import { TableCell, TableRow } from '@material-ui/core';
import { Book } from '../../../interfaces/book';
import { useHistory } from 'react-router';

interface Props {
    props: string | undefined;
    book: Book | undefined
}

export default function BookTable({ props, book }: Props) {
    const history = useHistory();
    const id = props;

    //rendered HTML
    return (
        <TableRow
            onClick={() => history.push(`/search/book-info/${id}`)}
        >
            <TableCell>
                <img className="image" src={book?.images[0]} alt="Image not available" />
                <div className="description">
                    <div className="title">{book?.title}</div>
                    <div className="subtitles">Authors : {book?.author}</div>
                    <div className="subtitles">ISBN : {book?.ISBN}</div>
                    <div className="subtitles">Price : ${book?.price}</div>
                </div>
            </TableCell>
        </TableRow>
    );
}
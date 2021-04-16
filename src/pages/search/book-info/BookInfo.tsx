import './BookInfo.scss';
import { Card, Progress, ReturnButton } from '../../../components';
import BookController from '../../../firebase/book.controller';
import { useEffect, useState } from 'react';
import { Book } from '../../../interfaces/book';
import { useHistory, useParams } from 'react-router';
import { useSnackbar } from '../../../contexts';
import AwesomeSlider from 'react-awesome-slider';
//import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';



export default function BookInfo() {
    const bookController = new BookController();
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book>();

    const slider = (
        <AwesomeSlider animation="foldOutAnimation">
            {book == undefined ? null :
                book.images.map(image => (
                    <div key={id} data-src={image} />
                ))}
        </AwesomeSlider>
    );

    useEffect(() => {
        const getBook = async () => {
            const books: Map<string, Book> = await (bookController.getBookById(id));
            const book: Book = Array.from(books.values())[0];
            setBook(book);
        };
        getBook();
    }, [id]);

    return book === undefined ? (<Progress />) : (
        <div className="BookInfo">
            <div className="top">
                <div className="top__left">
                    <ReturnButton to="/search" />
                </div>
            </div>
            <div>
                <Card className="image">
                    <div className="title">Book Images</div>
                    {slider}
                </Card>
                <Card className="description">
                    <div className="title"> Book description </div>
                    <div><b>ISBN: </b>{book.ISBN}</div>
                    <div><b>Author: </b>{book.author}</div>
                    <div><b>Title: </b>{book.title}</div>
                    <div><b>University: </b>{book.university}</div>
                    <div><b>Year: </b>{book.year}</div>
                    <div><b>Price:</b> ${book.price}</div>
                    <div><b>Book condition: </b>{book.condition}</div>
                    <div><b>Course: </b>{book.courseSubject + " " + book.courseNumber}</div>
                    <div><b>Page corners folded: </b>{book.pageCornersFolded ? "YES" : "NO"}</div>
                    <div><b>Page annotated: </b>{book.pagesAnnotated ? "YES" : "NO"}</div>
                </Card>
            </div>
            <Card className="clearFix">
                    <div className="title">Additional Information</div>
                    <div className="break-text">{book.description}</div>
            </Card>
            <Card>
                <div className="title">Seller Information</div>
                <div className="space"><b>Email: </b>{book.email}</div>
                <div><b>Phone number: </b>{book.phone}</div>
            </Card>
        </div>
    );
}
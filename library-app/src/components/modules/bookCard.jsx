import BookDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const BookDetailCard = ({ detailBook }) => {

    return (
        <>
            <Container className="book-details">
                <BookDetail label="Title" value={detailBook.title} />
                <BookDetail label="Category" value={detailBook.category} />
                <BookDetail label="ISBN" value={detailBook.isbn} />
                <BookDetail label="Publisher" value={detailBook.publisher} />
                <BookDetail label="Description" value={detailBook.description} />
                <BookDetail label="Language" value={detailBook.language} />
                <BookDetail label="Location" value={detailBook.libraryLocation} />
                
            </Container>
        </>

    );
};

export default BookDetailCard;

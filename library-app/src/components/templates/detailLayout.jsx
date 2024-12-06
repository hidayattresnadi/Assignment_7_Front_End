import Container from '../elements/container';
import '../../bookCard.css'

function DetailLayout({ title, children }) {
    return (
        <Container className="card shadow p-4 mb-5 bg-light rounded" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Container className="card-body">
                <h4 className="card-title text-center mb-4 text-primary">{title}</h4>
                <hr />
                {children}
            </Container>
        </Container>
    );
}

export default DetailLayout;

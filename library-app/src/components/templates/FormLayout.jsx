import Container from '../elements/container';

function FormLayout({ title, children }) {
    return (
        <Container className="min-vh-100 d-flex flex-column align-items-center" style={{ marginTop: '80px' }}>
            <Container className="card" style={{ width: '90%', maxWidth: '600px', padding:0 }}>
                <Container className="w-100 container-fluid card-header bg-dark text-white text-center">
                    <h1 className="mb-0 w-100">{title}</h1>
                </Container>
                <Container className="card-body text-start">
                    {children}
                </Container>
            </Container>
        </Container>
    );
}

export default FormLayout;

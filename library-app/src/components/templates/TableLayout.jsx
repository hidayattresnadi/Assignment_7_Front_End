import Button from '../elements/button';
import Container from '../elements/container';

function TableLayout({ title, children, buttonTitle, onClick }) {
    return (
        <Container className="d-flex flex-column align-items-center">
            <Container style={{ width: "90%", maxWidth: "1200px" }}>
                <h1 className="text-center mb-4">{title}</h1>

                <Container className="table-responsive">
                    {children}
                </Container>

                {title && buttonTitle ? 
                <div className="d-flex justify-content-center mt-4">
                    <Button className='btn btn-primary' onClick={onClick}  style={{ width: "500px", padding: "12px 24px", fontSize: "18px" }}>
                        {buttonTitle}
                    </Button>
                </div> : '' }

            </Container>
        </Container>

    );
}

export default TableLayout;

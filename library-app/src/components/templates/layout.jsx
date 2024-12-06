import Footer from "../templates/footer";
import Header from "../modules/headerSection";
import { Outlet } from "react-router-dom";
import Container from "../elements/container";


const Layout = ({ setEditingBook, setEditingMember, setErrors }) => {
    return (
        <>

            <Container className="d-flex flex-column min-vh-100">
                <Header setEditingBook={setEditingBook} setEditingMember={setEditingMember} setErrors={setErrors} />
                <Container className="flex-grow-1">
                    <Outlet />
                </Container>
                <Footer />
            </Container>
        </>
    );

};

export default Layout;
import axios from 'axios';
import '../../dashboard.css'
import Container from '../elements/container';
import Icon from '../elements/icon';
import Text from '../elements/text';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import BookService from '../../services/bookService';

function HomePage({ members, setMembers }) {
    const [ErrorStatus, setErrorStatus] = useState();
    const [loading, setLoading] = useState(true);
    const [totalBooks, setTotalBooks] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                let response = await BookService.getAll();
                setTotalBooks(response.data.totalCount);
            }
            catch (error) {
                setErrorStatus(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        myFetch();
    }, [setTotalBooks, ErrorStatus])

    useEffect(() => {
        const myFetch = async () => {
            try {
                // let response = await axios.get(`http://localhost:5184/User`);
                // setMembers(response.data);
            }
            catch (error) {
                setErrorStatus(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        }
        myFetch();
    }, [setMembers, ErrorStatus])

    return (
        <>
            {loading ? <LoadingSpinner /> : 
            ErrorStatus ? <Container><h1>Terjadi Gangguan...</h1></Container> :
                <Container className='dashboard-container'>
                    <h1 className='text-center'>Library Dashboard</h1>
                    <Container className='dashboard-grid'>
                        <Container className='card'>
                            <Icon className='fas fa-users fa-2x'></Icon>
                            <h2>Total Members</h2>
                            <Text>{members.length}</Text>
                        </Container>
                        <Container className='card'>
                            <Icon className='fas fa-book fa-2x'></Icon>
                            <h2>Total Books</h2>
                            <Text>{totalBooks}</Text>
                        </Container>
                    </Container>
                </Container>
            }
        </>
    )
}

export default HomePage;
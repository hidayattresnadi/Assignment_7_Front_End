import Container from '../elements/container';
import Text from '../elements/text';
import GreetingMessage from '../widgets/greetingsMessage';
import '../../header.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSilce';

const Header = ({ setEditingBook, setEditingMember, setErrors }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date();
  const fullDate = date.toLocaleDateString('en-EN', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeOfDay = date.getHours() < 12 ? 'morning' : 'evening';

  const { user: currentUser } = useSelector(state => state.auth);
  const handleLogout = async () => {
    await dispatch(logout())
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setEditingBook(null)
    setEditingMember(null)
    setErrors(null)
  }

  const menuItems = [
    {
      label: 'Home', path: '/', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    },
    {
      label: 'Login', path: '/login', isAuthenticated: false
    },
    {
      label: 'Uploads', path: '/uploadFiles', isAuthenticated: false
    },
    {
      label: 'Profile', path: '/profile', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    },
    {
      label: 'Logout'
    },
    {
      label: 'Members', path:'/members', visibleForRoles: ['Library Manager']
    },
    {
      label: 'Book Add Request', path:'/bookRequest', visibleForRoles: ['Library Manager','Librarian', 'Library User']
    },
    {
      label: 'Book Request Lists', path: '/bookRequests', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    },
    {
      label: 'Books', path:'/books/search', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    },
    {
      label: 'Books Search', path:'/books', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    },
    {
      label: 'Borrow Book', path:'/borrow', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    },
    {
      label: 'Return Book', path:'/return', visibleForRoles: ['Library Manager', 'Librarian', 'Library User']
    }

  ];

  const isMenuVisible = (item) => {
    // Selalu tampilkan menu untuk semua user
    if (item.visibleForAll) return true;

    //jika user belum login, tampilkan menu yang isAuthenticated false
    if (item.isAuthenticated == false && !currentUser) {
      return true;
    }

    //jika user sudah login, tampilkan logout
    if (item.label == 'Logout' && currentUser) {
      return true;
    }


    if (item.label == 'Profile' && currentUser) {
      return true;
    }

    // Cek role untuk menu spesifik
    if (item.visibleForRoles && currentUser?.roles) {
      return item.visibleForRoles.some(role =>
        currentUser.roles.includes(role)
      );
    }

    return false;
  };


  return (
    <Container className="container-fluid d-flex flex-column align-items-center bg-header mb-5 position-relative">
      {/* Overlay for Background Image */}
      <div className="overlay"></div>

      {/* Navigation and Title */}
      <div className="d-flex w-100 justify-content-between align-items-center px-4">
        <Text className="text-white fs-1 fw-bold z-index-1">Library App</Text>
        <div className="nav-links d-flex gap-4">
          <ul className="navbar-nav ms-auto gap-4">
            {menuItems.filter(isMenuVisible).map((item, index) => (
              <li className="nav-item" key={index}>
                <span
                  className="nav-link text-white fw-bold fs-5"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (item.label === 'Logout') {
                      handleLogout();
                    } else if (item.path) {
                      handleNavigation(item.path);
                    }
                  }}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Greeting Message */}
      <GreetingMessage timeOfDay={timeOfDay} fullDate={fullDate} />
    </Container>
  );
};

export default Header;



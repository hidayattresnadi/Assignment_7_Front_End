import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSilce'





const handleLogout = () => {
    dispatch(logout());
    navigate('/');
};

const Header2 = () => {
    const { user: currentUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuItems = [
        {
            label: 'Dashboard', path: '/', visibleForAll: true
        },
        {
            label: 'Profil', path: '/profile',
            visibleForRoles: ['Librarian', 'Library Manager', 'Library User']
        },
        {
            label: 'Daftar Buku', path: '/books', visibleForRoles: ['Librarian']
        },
        {
            label: 'Users', path: '/users', visibleForRoles: ['Library Manager']
        },
        {
            label: 'Login', path: '/login', isAuthenticated: false
        },
        {
            label: 'Register', path: '/register', isAuthenticated: false
        },
        {
            label: 'Logout'
        },
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
    
        // Cek role untuk menu spesifik
        if (item.visibleForRoles && currentUser?.roles) {
            return item.visibleForRoles.some(role =>
                currentUser.roles.includes(role)
            );
        }
    
        return false;
    };
    return (
        <header>
            <h2>Library Management System</h2>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Library App</a>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {menuItems.filter(isMenuVisible).map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <a
                                        className="nav-link"
                                        href={item.path}
                                        onClick={item.label === 'Logout' ? handleLogout : null}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            {currentUser ?<h6>Welcome, <strong>{currentUser?.user?.userName}</strong></h6>
                : ''
            }
        </header>
    );
}

export default Header2;






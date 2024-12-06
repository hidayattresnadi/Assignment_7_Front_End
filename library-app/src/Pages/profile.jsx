import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSilce";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('kwkwkw')
    console.log(currentUser);
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Memanggil action logout untuk menghapus data user
    navigate("/login"); // Redirect ke halaman login
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container">
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <strong>Roles:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      {/* Tombol Logout */}
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Logout
      </button>
    </div>
  );
};

export default Profile;

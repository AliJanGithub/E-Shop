import { useNavigate } from 'react-router-dom';
import { Url } from '../../contant';
import { useEffect, useState } from 'react';
type usertype={
    _id:string
    name:string
    email:string
    isAdmin:boolean
}
function Profile() {
  const [user, setuser] = useState<usertype>();
  const navigate = useNavigate();
  const rawuser = localStorage.getItem('user');
  const userw = rawuser ? JSON.parse(rawuser) : null;
  const token = userw?.token;

  const profileData: () => Promise<void> = async () => {
    try {
      const response = await fetch(`${Url}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const data = await response.json();

      console.log(data);
      setuser(data.user);
    } catch (error) {
      console.log(error);
      alert('Problem in getting your profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-purple-600">🛍️ E-Shop</h1>
        <div className="space-x-2 sm:space-x-4 flex flex-wrap justify-center">
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-800 hover:text-purple-600 font-medium"
          >
            Profile
          </button>
          <button
            onClick={() => navigate('/create-product')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            + Create Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Profile Info */}
      <div className="max-w-md w-[90%] sm:w-full mx-auto mt-10 sm:mt-20 bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">👤 Profile</h2>
        {user ? (
          <>
            <p className="text-base sm:text-lg text-gray-700 mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-base sm:text-lg text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
          </>
        ) : (
          <p className="text-gray-600">No user data found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

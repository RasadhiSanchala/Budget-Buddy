import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../components/layouts/Logo';
import InputField from '../../components/layouts/InputField';
import YellowButton from '../../components/layouts/YellowButton';
import AuthCard from '../../components/layouts/AuthCard';
import AuthRightSection from '../../components/layouts/AuthRightSection';
import ProfilePhotoSelector from '../../components/layouts/ProfilePhotoSelector';

import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS }   from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';  


const SignUp = () => {
  const [showModal, setShowModal] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError('');

    try {

      //Upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        { fullName, email, password, profileImageUrl }
      );
    

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("Signup error response:", err.response);
      console.error("Signup error message:", err.message);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AuthCard>
            <h2 className="text-2xl font-bold mb-4 text-[#2D02AF]">Welcome to Budget Buddy 💰</h2>
            <p className="mb-6 text-lg text-gray-700">Are you ready to sign up and start managing your budget?</p>
            <YellowButton text="Yes, I'm Ready" onClick={() => setShowModal(false)} />
          </AuthCard>
        </div>
      )}

      <div className="flex h-screen overflow-y-hidden font-poppins">
        {/* Left Section */}
        <div className="w-1/3 bg-[#F4F4FF] px-12 py-8 flex flex-col relative">
          <Logo />
          <AuthCard>
            <div className="flex flex-col justify-end h-full max-w-xl w-full mx-auto pb-10">
              <h2 className="text-3xl font-semibold text-black">Create An account</h2>
              <p className="text-2xl text-slate-700 mb-5">Join us today by entering your details</p>

              <form className="space-y-5 mt-2" onSubmit={handleSubmit}>
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                <p className="text-s text-slate-700 mt-4 mb-2">Hi Buddy</p>

                <InputField
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm -mt-3">{error}</p>}

                <YellowButton text="Sign Up" type="submit" />
              </form>

              <p className="text-s text-slate-700 mt-8">
                Already Have an Account?{' '}
                <Link to="/login" className="text-[#2D02AF] cursor-pointer hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>

        {/* Right Section */}
        <AuthRightSection />
      </div>
    </>
  );
};

export default SignUp;

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../components/layouts/Logo';
import InputField from '../../components/layouts/InputField';
import YellowButton from '../../components/layouts/YellowButton';
import AuthCard from '../../components/layouts/AuthCard';
import AuthRightSection from '../../components/layouts/AuthRightSection';

import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    console.log("Sending login data:", { email, password }); 
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if(token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }

     

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
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
            <p className="mb-6 text-lg text-gray-700">Are you ready to login and start adding your transactions?</p>
            <YellowButton text="Yes, I'm Ready" onClick={() => setShowModal(false)} />
          </AuthCard>
        </div>
      )}

      <div className="flex h-screen relative overflow-y-hidden font-poppins">
        {/* Left Section */}
        <div className="w-1/3 bg-[#F4F4FF] px-12 py-8 flex flex-col relative">
          <Logo />
          <AuthCard>
            <div className="flex flex-col justify-end h-full max-w-xl w-full mx-auto pb-10">
              <h2 className="text-3xl font-semibold text-black">Welcome back to Budget Buddy.</h2>
              <p className="text-2xl text-slate-700 mb-6">Please enter your details to log in</p>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <form className="space-y-10 mt-3" onSubmit={handleLogin}>
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
                <YellowButton text="Login" type="submit" />
              </form>

              <p className="text-s text-slate-700 mt-8">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-[#2D02AF] cursor-pointer hover:underline">Sign up</Link>
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

export default Login;

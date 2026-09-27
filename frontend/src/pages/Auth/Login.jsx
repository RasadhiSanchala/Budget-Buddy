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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Sending login data:', { email, password });

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser({
          name: user.fullName,
          email: user.email,
          profilePhoto: user.profileImageUrl,
        });
        navigate('/Home');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen lg:flex items-stretch font-poppins bg-[#F4F4FF]">
      <div className="w-full lg:w-[38%] xl:w-1/3 min-h-screen bg-[#F4F4FF] px-5 sm:px-8 lg:px-10 xl:px-12 py-6 lg:py-8 flex flex-col">
        <Logo className="mb-8 lg:mb-10 xl:mb-12" />

        <div className="flex-1 flex items-center justify-center py-4">
          <AuthCard>
            <div className="w-full mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-black">
                Welcome back to Budget Buddy.
              </h2>
              <p className="text-lg sm:text-xl xl:text-2xl text-slate-700 mt-2 mb-6">
                Please enter your details to log in
              </p>

              {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

              <form className="space-y-6 mt-3" onSubmit={handleLogin}>
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

              <p className="text-sm sm:text-base text-slate-700 mt-7">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-[#2D02AF] cursor-pointer hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>
      </div>

      <AuthRightSection />
    </div>
  );
};

export default Login;

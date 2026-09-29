import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';

import Logo from '../../components/layouts/Logo';
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
    <div className="min-h-screen bg-[#F5F6FB] lg:flex">
      <div className="relative flex min-h-screen w-full flex-col px-5 py-6 sm:px-8 lg:w-[44%] lg:max-w-[620px] lg:px-10 xl:px-14">
        <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-[#765EF1]/10 blur-3xl" />

        <div className="relative z-10">
          <Logo className="w-[148px] sm:w-[160px]" />
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-8">
          <AuthCard>
            <div className="mb-7">
              <p className="mb-3 inline-flex rounded-full bg-[#6D55E8]/10 px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-[#6D55E8] uppercase">
                Welcome back
              </p>
              <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-[#171335] sm:text-[36px]">
                Sign in to your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-[15px]">
                Continue to your financial dashboard and stay in control of your money.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6D55E8] focus:bg-white focus:ring-4 focus:ring-[#6D55E8]/10"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6D55E8] focus:bg-white focus:ring-4 focus:ring-[#6D55E8]/10"
                  />
                </div>
              </label>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171335] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(23,19,53,0.20)] transition hover:-translate-y-0.5 hover:bg-[#211b4f]"
              >
                Sign in
                <ArrowRight size={17} />
              </button>
            </form>

            <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              New to Budget Buddy?{' '}
              <Link to="/signup" className="font-bold text-[#6D55E8] transition hover:text-[#4F37C5]">
                Create an account
              </Link>
            </div>
          </AuthCard>
        </div>

        <p className="relative z-10 text-center text-xs text-slate-400 lg:text-left">
          Simple money management for everyday life.
        </p>
      </div>

      <AuthRightSection />
    </div>
  );
};

export default Login;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, UserRound, X } from 'lucide-react';

import Logo from '../../components/layouts/Logo';
import AuthCard from '../../components/layouts/AuthCard';
import AuthRightSection from '../../components/layouts/AuthRightSection';
import ProfilePhotoSelector from '../../components/layouts/ProfilePhotoSelector';

import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
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

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

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
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/Login');
      }
    } catch (err) {
      console.error('Signup error response:', err.response);
      console.error('Signup error message:', err.message);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0C0A22]/70 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/10 bg-white p-7 shadow-[0_35px_100px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#765EF1]/15" />
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              aria-label="Close welcome dialog"
            >
              <X size={18} />
            </button>

            <div className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#171335] text-2xl shadow-lg">
                💸
              </div>
              <p className="text-xs font-bold tracking-[0.14em] text-[#6D55E8] uppercase">Start your journey</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[#171335] sm:text-3xl">
                Build better money habits with Budget Buddy.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Create your account, record income and expenses, and get a clear overview of your finances.
              </p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171335] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#211b4f]"
              >
                Create my account
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#F5F6FB] lg:flex">
        <div className="relative flex min-h-screen w-full flex-col px-5 py-6 sm:px-8 lg:w-[44%] lg:max-w-[620px] lg:px-10 xl:px-14">
          <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-[#765EF1]/10 blur-3xl" />

          <div className="relative z-10">
            <Logo className="w-[148px] sm:w-[160px]" />
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center py-8">
            <AuthCard>
              <div className="mb-6">
                <p className="mb-3 inline-flex rounded-full bg-[#6D55E8]/10 px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-[#6D55E8] uppercase">
                  Create account
                </p>
                <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-[#171335] sm:text-[36px]">
                  Start managing smarter
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-[15px]">
                  Set up your profile and take the first step toward a clearer financial picture.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                  <div className="relative">
                    <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6D55E8] focus:bg-white focus:ring-4 focus:ring-[#6D55E8]/10"
                    />
                  </div>
                </label>

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
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#6D55E8] focus:bg-white focus:ring-4 focus:ring-[#6D55E8]/10"
                    />
                  </div>
                </label>

                {error && (
                  <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171335] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(23,19,53,0.20)] transition hover:-translate-y-0.5 hover:bg-[#211b4f]"
                >
                  Create account
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="mt-6 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-[#6D55E8] transition hover:text-[#4F37C5]">
                  Sign in
                </Link>
              </div>
            </AuthCard>
          </div>
        </div>

        <AuthRightSection />
      </div>
    </>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../components/layouts/Logo';
import InputField from '../../components/layouts/InputField';
import YellowButton from '../../components/layouts/YellowButton';
import AuthCard from '../../components/layouts/AuthCard';
import AuthRightSection from '../../components/layouts/AuthRightSection';





const SignUp = () => {
  const [showModal, setShowModal] = useState(true);
  const [profilePic, setProfilePic] = useState(null);


  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); 
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

              <form className="space-y-5 mt-2">
                <div className="flex justify-center mb-4">
                  <label htmlFor="profilePic" className="cursor-pointer">
                    <input
                      type="file"
                      id="profilePic"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePicChange}
                    />
                    <div
                      className={`w-24 h-24 rounded-full overflow-hidden ${profilePic ? 'border-4 border-[#2D02AF]' : 'border-2 border-slate-400'}`}
                    >
                      {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#F4F4FF] flex items-center justify-center text-[#2D02AF] text-xl">+</div>
                      )}
                    </div>
                  </label>
                </div>

                <p className="text-s text-slate-700 mt-4 mb-8">
                Hi Buddy</p>

              
                <InputField type="text" placeholder="Full Name" />
                <InputField type="email" placeholder="Email" />
                <InputField type="password" placeholder="Password" />
          
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

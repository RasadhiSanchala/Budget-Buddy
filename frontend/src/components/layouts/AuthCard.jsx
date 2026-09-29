const AuthCard = ({ children, className = '' }) => (
  <div
    className={`w-full max-w-[460px] rounded-[30px] border border-white/70 bg-white/95 p-6 shadow-[0_28px_70px_rgba(34,31,70,0.14)] backdrop-blur-xl sm:p-8 lg:p-9 ${className}`}
  >
    {children}
  </div>
);

export default AuthCard;

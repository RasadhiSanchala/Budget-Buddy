const AuthCard = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 sm:p-8 lg:p-9 w-full max-w-md text-center ${className}`}
  >
    {children}
  </div>
);

export default AuthCard;

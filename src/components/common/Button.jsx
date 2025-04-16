const Button = ({ children, variant = 'primary', onClick, type = 'button', className = '' }) => {
    const variants = {
      primary: 'bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300',
      secondary: 'bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-300',
      outline: 'border border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition duration-300',
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
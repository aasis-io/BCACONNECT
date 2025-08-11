import { Link } from "react-router-dom";

import ErrorImage from "./../assets/404.svg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16 font-poppins">
      <img src={ErrorImage} alt="404 Not Found" className="h-72 mb-8 myAnimation" />
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-hover bg-main transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

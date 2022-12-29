import React from "react";
import { Link } from "react-router-dom";

const UpdatedMessage = () => {
  return (
    <div className="h-[77vh] flex justify-center items-center bg-[#e0aaff]">
      <div className="flex justify-center">
        <p className="text-3xl font-bold pb-10 text-center">
          Your Information has been updated 😃
        </p>

        <Link to="/about">
          <button className="btn bg-[#9d4edd]">Go back to About page</button>
        </Link>
      </div>
    </div>
  );
};

export default UpdatedMessage;

import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import logo from "../../../assets/portfolio logo.png";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("log out successfull");
      })
      .catch((err) => console.log(err));
  };
  const menu = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/media">Media</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>

      {user?.uid ? (
        <li>
          <button onClick={handleLogOut}>Sign Out</button>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="bg-[#7b2cbf] ">
        <div className="navbar  container mx-auto flex justify-between">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black font-semibold"
              >
                {menu}
              </ul>
            </div>
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl font-bold text-[#e9c46a]"
            >
              <img className="w-[60px] h-[60px]" src={logo} alt="" />
              <p>Purple Media</p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0 text-[#e9c46a] font-semibold">
              {menu}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

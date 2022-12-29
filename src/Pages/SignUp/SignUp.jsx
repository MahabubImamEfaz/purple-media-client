import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const { createUser, updateUser, providerLogin } = useContext(AuthContext);
  const googleAuth = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleAuth)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User created succesfully");
        reset();
      })
      .catch((error) => console.log(error));
  };

  const handleSignIn = (data) => {
    console.log(data);
    setLoginError("");
    reset();
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User created succesfully");
        // const userinfo = {
        //   displayName: data.name,
        // };
        updateUser({ displayName: data.name })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        saveUser(
          data.name,
          data.email,
          data.university,
          data.address,
          data.password
        );
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const saveUser = (name, email, university, address, password) => {
    const user = { name, email, university, address, password };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("save user", data);
      });
  };

  return (
    <div className="h-[1000px] flex justify-center items-center bg-[#e0aaff]">
      <div className="w-96 p-7">
        <h2 className="text-center text-3xl text-center text-black font-bold mb-5">
          LOGIN
        </h2>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">University</span>
            </label>
            <input
              type="text"
              {...register("university", {
                required: "University name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.university && (
              <p className="text-red-600">{errors.university?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              {...register("address", {
                required: " Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.address && (
              <p className="text-red-600">{errors.address?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              {" "}
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent w-full bg-[#9d4edd] text-white hover:bg-[#c77dff]"
            value="Sign Up"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-600">{loginError}</p>}
          </div>
        </form>
        <p>
          New to Doctors Portal{" "}
          <Link className="text-secondary" to="/login">
            Already have an account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default SignUp;
